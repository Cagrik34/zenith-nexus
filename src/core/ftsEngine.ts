import type { VaultNote } from '../types';

export interface FTSResult {
  note: VaultNote;
  score: number;
  snippet: string;
  matchedTokens: string[];
}

export class InMemoryFTSEngine {
  private notes: VaultNote[] = [];

  constructor(initialNotes: VaultNote[] = []) {
    this.notes = initialNotes;
  }

  public setNotes(notes: VaultNote[]) {
    this.notes = notes;
  }

  private escapeRegex(str: string): string {
    return str.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
  }

  public search(query: string, categoryFilter?: string): FTSResult[] {
    const rawTokens = query.toLowerCase().split(/\s+/).filter(t => t.trim().length > 0);
    if (rawTokens.length === 0) {
      return this.notes
        .filter(n => !categoryFilter || n.category === categoryFilter)
        .map(note => ({
          note,
          score: 1.0,
          snippet: note.content.slice(0, 140) + '...',
          matchedTokens: []
        }));
    }

    // Pre-compile regex matchers once per query
    const tokenMatchers = rawTokens.map(token => {
      let rx: RegExp | null = null;
      try {
        rx = new RegExp(this.escapeRegex(token), 'g');
      } catch {
        rx = null;
      }
      return { token, rx };
    });

    const results: FTSResult[] = [];

    for (let i = 0; i < this.notes.length; i++) {
      const note = this.notes[i];
      if (categoryFilter && note.category !== categoryFilter) continue;

      const titleLower = note.title.toLowerCase();
      const contentLower = note.content.toLowerCase();
      const tagsLower = note.tags;

      let score = 0;
      const matchedTokens: string[] = [];

      for (let j = 0; j < tokenMatchers.length; j++) {
        const { token, rx } = tokenMatchers[j];
        let tokenScore = 0;

        if (titleLower.includes(token)) {
          tokenScore += 10;
          matchedTokens.push(token);
        }

        for (let k = 0; k < tagsLower.length; k++) {
          if (tagsLower[k].toLowerCase().includes(token)) {
            tokenScore += 6;
            matchedTokens.push(token);
            break;
          }
        }

        if (rx) {
          const matches = contentLower.match(rx);
          if (matches) {
            tokenScore += Math.min(15, matches.length * 2);
            matchedTokens.push(token);
          }
        } else if (contentLower.includes(token)) {
          tokenScore += 3;
          matchedTokens.push(token);
        }

        score += tokenScore;
      }

      if (score > 0) {
        const firstToken = matchedTokens[0] || '';
        const firstIndex = contentLower.indexOf(firstToken);
        const start = Math.max(0, firstIndex - 40);
        const end = Math.min(note.content.length, firstIndex + 120);
        const snippet = (start > 0 ? '...' : '') + note.content.slice(start, end) + (end < note.content.length ? '...' : '');

        results.push({
          note,
          score,
          snippet,
          matchedTokens: Array.from(new Set(matchedTokens))
        });
      }
    }

    return results.sort((a, b) => b.score - a.score);
  }
}
