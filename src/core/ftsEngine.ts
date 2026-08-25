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

    const results: FTSResult[] = [];

    for (const note of this.notes) {
      if (categoryFilter && note.category !== categoryFilter) continue;

      const titleLower = note.title.toLowerCase();
      const contentLower = note.content.toLowerCase();
      const tagsLower = note.tags.map(t => t.toLowerCase());

      let score = 0;
      const matchedTokens: string[] = [];

      for (const token of rawTokens) {
        let tokenScore = 0;
        if (titleLower.includes(token)) {
          tokenScore += 10;
          matchedTokens.push(token);
        }
        if (tagsLower.some(t => t.includes(token))) {
          tokenScore += 6;
          matchedTokens.push(token);
        }
        const occurrences = (contentLower.match(new RegExp(token, 'g')) || []).length;
        if (occurrences > 0) {
          tokenScore += Math.min(15, occurrences * 2);
          matchedTokens.push(token);
        }

        score += tokenScore;
      }

      if (score > 0) {
        const firstIndex = contentLower.indexOf(matchedTokens[0] || '');
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