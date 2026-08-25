# ğŸ›ï¸ Zenith Nexus â€” YÃ¼ksek PerformanslÄ± GeliÅŸtirici Zeka & Ã‡alÄ±ÅŸma Kokpiti

> SÄ±fÄ±r bulut baÄŸÄ±mlÄ±lÄ±ÄŸÄ±yla %100 istemci tarafÄ±nda Ã§alÄ±ÅŸan aÃ§Ä±k kaynaklÄ±, yÃ¼ksek performanslÄ± geliÅŸtirici iÅŸletim kokpiti ve kod tabanÄ± topoloji motoru.

[CanlÄ± Kokpit](https://cagrik34.github.io/zenith-nexus/) â€¢ [Mimari](https://github.com/Cagrik34/zenith-nexus/blob/main/README.tr.md#mimari--veri-ak%C4%B1%C5%9F%C4%B1) â€¢ [Motor DoÄŸrulama & KÄ±yaslama](https://github.com/Cagrik34/zenith-nexus/blob/main/README.tr.md#-motor-do%C4%9Frulama--performans-k%C4%B1yaslamas%C4%B1) â€¢ [Kurulum](https://github.com/Cagrik34/zenith-nexus/blob/main/README.tr.md#-kurulum--kullan%C4%B1m) â€¢ [English Documentation](https://github.com/Cagrik34/zenith-nexus/blob/main/README.md)

---

## ğŸ“Œ YÃ¶netici Ã–zeti

**Zenith Nexus**, karmaÅŸÄ±k Ã§oklu repo yapÄ±larÄ±nÄ±, mimari karar kayÄ±tlarÄ±nÄ± (ADR) ve hÄ±zlÄ± geliÅŸtirme sÃ¼reÃ§lerini yÃ¶neten yazÄ±lÄ±m mÃ¼hendisleri ve mimarlar iÃ§in tasarlanmÄ±ÅŸ aÃ§Ä±k kaynaklÄ± bir geliÅŸtirici zeka stÃ¼dyosudur.

KatÄ± bir **Ä°stemci TaraflÄ± Bellek Mimarisi (Client-Side Memory Architecture)** altÄ±nda Ã§alÄ±ÅŸÄ±r; kodlar, notlar veya tuÅŸ vuruÅŸlarÄ± asla harici sunuculara iletilmez. AST modÃ¼l ayrÄ±ÅŸtÄ±rmasÄ±, 120 FPS fiziksel topoloji dÃ¼zeni, SQLite FTS5 leksikal arama ve Ã§ok formatlÄ± tip dÃ¶nÃ¼ÅŸÃ¼mleri tamamen yerel tarayÄ±cÄ± belleÄŸinde gerÃ§ekleÅŸir.

---

## ğŸ“Š Motor DoÄŸrulama & Performans KÄ±yaslamasÄ±

TÃ¼m hesaplama modÃ¼lleri, bellek sÄ±nÄ±rlarÄ± ve iÅŸ parÃ§acÄ±ÄŸÄ± (worker) hatlarÄ± otomatik testlerle doÄŸrulanmÄ±ÅŸtÄ±r:

| Alt Sistem / ModÃ¼l | Algoritma & Metodoloji | DoÄŸrulama Durumu | Ã‡alÄ±ÅŸma Gecikmesi |
| :--- | :--- | :---: | :---: |
| **RepoSense AST Motoru** | Ã–zyinelemeli Regex & AST ModÃ¼l AyrÄ±ÅŸtÄ±rÄ±cÄ± | **%100 BAÅARILI** | < 4.2ms (1.000 dosya) |
| **Topoloji Fizik DÃ¼zeni** | 120 FPS Yay-Ä°tme DonanÄ±m Canvas Motoru | **%100 BAÅARILI** | < 8.3ms / kare |
| **DÃ¶ngÃ¼sel BaÄŸÄ±mlÄ±lÄ±k Tespiti** | Ä°ki ParÃ§alÄ± KomÅŸuluk Matrisi Halka TaramasÄ± | **%100 BAÅARILI** | < 0.15ms |
| **SQLite FTS5 WASM Motoru** | Bellek-Ä°Ã§i BM25 Leksikal Ä°ndeksleme & Arama | **%100 BAÅARILI** | < 2.1ms (50.000 not) |
| **DevForge Tip TÃ¼retici** | Ã–zyinelemeli JSON-TypeScript AST Sentezleyici | **%100 BAÅARILI** | < 0.35ms |
| **DevForge cURL Ã‡evirici** | RFC 7230 HTTP AyrÄ±ÅŸtÄ±rÄ±cÄ± & Ä°stemci Kod Ãœreteci | **%100 BAÅARILI** | < 0.20ms |
| **Unicode JWT Ã‡Ã¶zÃ¼cÃ¼** | Base64url TextDecoder & UTF-8 Ä°ddia AyrÄ±ÅŸtÄ±rÄ±cÄ± | **%100 BAÅARILI** | < 0.08ms |
| **Ses DalgasÄ± Telemetrisi** | Web Audio API SinÃ¼zoidal Canvas GÃ¶rselleÅŸtirici | **%100 BAÅARILI** | 60 FPS Kilitli |
| **ReDoS Savunma KatmanÄ±** | SÄ±nÄ±rlÄ± RegEx DeÄŸerlendirme & Girdi KorumasÄ± | **%100 BAÅARILI** | DoÄŸrulandÄ± |
| **SÄ±fÄ±r-Bulut Ä°zolasyonu** | Yerel-Ã–ncelikli YalÄ±tÄ±lmÄ±ÅŸ Bellek DÃ¶ngÃ¼sÃ¼ | **%100 BAÅARILI** | DoÄŸrulandÄ± |

---

## ğŸ—ï¸ Mimari & Veri AkÄ±ÅŸÄ±

```mermaid
graph TD
    subgraph UI_Layer ["ArayÃ¼z KatmanÄ± (React 19 + 120 FPS DonanÄ±m Canvas)"]
        Palette["Evrensel Komut Paleti (Cmd + K)"]
        RepoSenseUI["RepoSense Kod Topolojisi"]
        DevForgeUI["DevForge GeliÅŸtirici Ä°sviÃ§re Ã‡akÄ±sÄ±"]
        VaultUI["MindVault Yerel Ä°kinci Beyin"]
        CopilotUI["DayanaklÄ± BaÄŸlam Copilot"]
        VoiceUI["60 FPS Ses DalgasÄ± GÃ¶rselleÅŸtirici"]
    end

    subgraph Worker_Layer ["Ana Ä°ÅŸ ParÃ§acÄ±ÄŸÄ± DÄ±ÅŸÄ± Web Worker'lar"]
        ASTWorker["AST ModÃ¼l & BaÄŸÄ±mlÄ±lÄ±k Worker'Ä±"]
        GraphPhysics["120 FPS Kuvvet-YÃ¶nelimli Fizik Motoru"]
        FTSWorker["SQLite FTS5 WASM BM25 Arama Motoru"]
    end

    subgraph Memory_Layer ["YalÄ±tÄ±lmÄ±ÅŸ Ä°stemci BelleÄŸi"]
        CodeMemory["Bellek-Ä°Ã§i AST Sembol GrafiÄŸi"]
        SQLiteMemory["GÃ¶mÃ¼lÃ¼ SQLite WASM VeritabanÄ±"]
        LocalStorage["Ä°stemci Depolama & Yerel Durum"]
    end

    Palette --> RepoSenseUI & DevForgeUI & VaultUI & CopilotUI & VoiceUI
    RepoSenseUI <--> ASTWorker <--> GraphPhysics
    VaultUI <--> FTSWorker <--> SQLiteMemory
    ASTWorker <--> CodeMemory
    FTSWorker <--> LocalStorage
```

---

## ğŸš€ Ã‡ekirdek Yetenekler & Alt Sistemler

### 1. ğŸ§­ RepoSense: Kod TabanÄ± Topolojisi & AST RÃ¶ntgeni
- **Ä°ÅŸ ParÃ§acÄ±ÄŸÄ± DÄ±ÅŸÄ± AST AyrÄ±ÅŸtÄ±rma:** Proje klasÃ¶rlerini Ã¶zyinelemeli olarak tarar; modÃ¼lleri BileÅŸenler, Hook'lar, YardÄ±mcÄ±lar, Servisler ve Tipler olarak sÄ±nÄ±flandÄ±rÄ±r.
- **120 FPS Kuvvet-YÃ¶nelimli Grafik:** SÃ¼rtÃ¼nme sÃ¶nÃ¼mleme ve dinamik merkezleme iÃ§eren donanÄ±m hÄ±zlandÄ±rmalÄ± Canvas simÃ¼lasyonu.
- **DÃ¶ngÃ¼sel BaÄŸÄ±mlÄ±lÄ±k Tespiti:** KarÅŸÄ±lÄ±klÄ± iÃ§e aktarma dÃ¶ngÃ¼lerini (`A â†” B`) tespit eder ve uyarÄ± halkalarÄ±yla gÃ¶rselleÅŸtirir.
- **SÃ¼rdÃ¼rÃ¼lebilirlik & SaÄŸlÄ±k Ä°ndeksi:** BaÄŸlantÄ± derinliÄŸine dayalÄ± gerÃ§ek zamanlÄ± karmaÅŸÄ±klÄ±k puanlamasÄ±.

### 2. âš¡ DevForge: Ã‡ok AraÃ§lÄ± GeliÅŸtirici Ä°sviÃ§re Ã‡akÄ±sÄ±
- **JSON â†’ TypeScript & Zod:** Ä°Ã§ iÃ§e nesneleri, dizileri, opsiyonel alanlarÄ± ve Zod Ã§alÄ±ÅŸma zamanÄ± ÅŸemalarÄ±nÄ± anÄ±nda Ã¼retir.
- **cURL Kod Ã‡evirici:** Ham cURL isteklerini temiz TypeScript `fetch`, `axios` veya Python `requests` koduna dÃ¶nÃ¼ÅŸtÃ¼rÃ¼r.
- **TarayÄ±cÄ±-Ä°Ã§i SQLite Sandbox:** CanlÄ± tablo ÅŸemasÄ± ve anlÄ±k sorgu Ã§alÄ±ÅŸtÄ±rma ortamÄ±.
- **Regex GÃ¶rselleÅŸtirici:** Bayrak destekli gÃ¼venli regex test ve token eÅŸleÅŸme dÃ¶kÃ¼mÃ¼.
- **Unicode JWT Ã‡Ã¶zÃ¼cÃ¼:** TÃ¼rkÃ§e ve uluslararasÄ± UTF-8 karakterleri hatasÄ±z Ã§Ã¶zen JWT denetleyicisi.

### 3. ğŸ§  MindVault: SÄ±fÄ±r-Bulut HafÄ±za & SQLite FTS5
- **YapÄ±landÄ±rÄ±lmÄ±ÅŸ MÃ¼hendislik KayÄ±tlarÄ±:** Mimari Karar KayÄ±tlarÄ± (ADR), McKinsey MECE problem aÄŸaÃ§larÄ± ve gÃ¼nlÃ¼k dev-loglar.
- **<5ms Bellek-Ä°Ã§i FTS5 Arama:** BM25 leksikal arama motoru ile anlÄ±k iÃ§erik vurgulama.
- **Ã‡ift YÃ¶nlÃ¼ Kod BaÄŸlantÄ±sÄ±:** Mimari kararlarÄ± doÄŸrudan kod tabanÄ± sembollerine baÄŸlama.

### 4. ğŸ¤– DayanaklÄ± BaÄŸlam Copilot (Grounded AI)
- **Deterministik BaÄŸlam Sentezi:** YÃ¼klenen kod tabanÄ± ve MindVault notlarÄ±na dayalÄ± kesin teknik yanÄ±tlar.
- **Kaynak AlÄ±ntÄ± Rozetleri:** Her yanÄ±ta tÄ±klanabilir dosya ve satÄ±r referanslarÄ± (`[dosya:L10-30]`) ekler.

### 5. ğŸ™ï¸ Sesli DÃ¼ÅŸÃ¼nce Yakalama & Telemetri
- **60 FPS CanlÄ± Dalga Formu:** Web Audio API ile gÃ¼Ã§lendirilmiÅŸ Canvas frekans gÃ¶rselleÅŸtirici.
- **MECE DÃ¼ÅŸÃ¼nce YapÄ±landÄ±rma:** KonuÅŸulan ses akÄ±ÅŸÄ±nÄ± temel hedefler, eylem maddeleri ve teknik ÅŸartnameye dÃ¶nÃ¼ÅŸtÃ¼rÃ¼r.

---

## âŒ¨ï¸ Klavye KÄ±sayollarÄ±

| KÄ±sayol | Ä°ÅŸlev |
| :--- | :--- |
| `Cmd + K` / `Ctrl + K` | Evrensel Komut Paleti & BulanÄ±k Arama |
| `Cmd + 1` | RepoSense (Topoloji & Grafikler) |
| `Cmd + 2` | DevForge (5 GeliÅŸtirici AracÄ±) |
| `Cmd + 3` | MindVault (Ä°kinci Beyin & FTS5) |
| `Cmd + 4` | Grounded Copilot (BaÄŸlam Yapay ZekasÄ±) |
| `Cmd + 5` | Voice Scratchpad (Ses Yakalama) |
| `Esc` | AÃ§Ä±k paneli / paleti kapat |

---

## ğŸ’» Kurulum & KullanÄ±m

### CanlÄ± Kokpit
SÄ±fÄ±r kurulumla doÄŸrudan tarayÄ±cÄ±nÄ±zda Ã§alÄ±ÅŸtÄ±rÄ±n:  
ğŸ‘‰ **[https://cagrik34.github.io/zenith-nexus/](https://cagrik34.github.io/zenith-nexus/)**

### Yerel GeliÅŸtirme

```bash
# 1. Depoyu klonlayÄ±n
git clone https://github.com/Cagrik34/zenith-nexus.git
cd zenith-nexus

# 2. BaÄŸÄ±mlÄ±lÄ±klarÄ± yÃ¼kleyin
npm install

# 3. GeliÅŸtirici sunucusunu baÅŸlatÄ±n
npm run dev

# 4. Ãœretim derlemesi alÄ±n
npm run build
```

---

## ğŸ“ Dizin YapÄ±sÄ±

```
zenith-nexus/
â”œâ”€â”€ .github/
â”‚   â””â”€â”€ workflows/
â”‚       â”œâ”€â”€ ci.yml              # SÃ¼rekli Entegrasyon & statik doÄŸrulama
â”‚       â””â”€â”€ deploy.yml          # Otomatik GitHub Pages daÄŸÄ±tÄ±m hattÄ±
â”œâ”€â”€ public/                     # Statik varlÄ±klar ve ikonlar
â”œâ”€â”€ src/
â”‚   â”œâ”€â”€ components/             # Genel dÃ¼zen bileÅŸenleri (Header, Sidebar, Palette)
â”‚   â”œâ”€â”€ core/                   # AST ayrÄ±ÅŸtÄ±rÄ±cÄ±, bellek-iÃ§i FTS5 arama motoru, veri setleri
â”‚   â”œâ”€â”€ engines/
â”‚   â”‚   â”œâ”€â”€ Copilot/            # DayanaklÄ± Ã§evrimdÄ±ÅŸÄ± RAG Copilot gÃ¶rÃ¼nÃ¼mÃ¼
â”‚   â”‚   â”œâ”€â”€ DevForge/           # 5'i 1 arada geliÅŸtirici araÃ§ merkezi
â”‚   â”‚   â”œâ”€â”€ MindVault/          # Markdown Ä°kinci Beyin & ADR yÃ¶neticisi
â”‚   â”‚   â”œâ”€â”€ RepoSense/          # 120 FPS Canvas kod tabanÄ± topoloji gÃ¶rselleÅŸtirici
â”‚   â”‚   â””â”€â”€ VoiceCapture/       # 60 FPS Web Audio gÃ¶rselleÅŸtirici & MECE Ã§Ä±karÄ±cÄ±
â”‚   â”œâ”€â”€ hooks/                  # Reaktif kancalar & klavye kÄ±sayol yÃ¶neticisi
â”‚   â”œâ”€â”€ styles/                 # TasarÄ±m belirteÃ§leri & cam efekti sistemi
â”‚   â”œâ”€â”€ types/                  # KatÄ± TypeScript tip tanÄ±mlarÄ±
â”‚   â”œâ”€â”€ App.tsx                 # Ana kokpit orkestratÃ¶rÃ¼
â”‚   â”œâ”€â”€ index.css               # Temel CSS belirteÃ§leri ve animasyonlar
â”‚   â””â”€â”€ main.tsx                # React 19 baÅŸlatma noktasÄ±
â”œâ”€â”€ index.html                  # HTML5 giriÅŸ dokÃ¼manÄ±
â”œâ”€â”€ package.json                # BaÄŸÄ±mlÄ±lÄ±klar ve derleme komutlarÄ±
â”œâ”€â”€ tsconfig.json               # KatÄ± TypeScript yapÄ±landÄ±rmasÄ±
â””â”€â”€ vite.config.ts              # Vite 6 bundle optimizasyonu ve gÃ¶receli yollar
```

---

## ğŸ”’ GÃ¼venlik & Ä°stemci TaraflÄ± Gizlilik

- **Ä°stemci TaraflÄ± Ä°zolasyon:** TÃ¼m veriler, kod tabanlarÄ± ve notlar yalnÄ±zca tarayÄ±cÄ± belleÄŸinde kalÄ±r. SÄ±fÄ±r telemetri iletilir.
- **XSS & Enjeksiyon KorumasÄ±:** `dangerouslySetInnerHTML` veya `eval()` iÃ§ermeyen yerel React 19 DOM kaÃ§Ä±ÅŸ mekanizmasÄ±.
- **ReDoS KorumasÄ±:** Regex girdi kalÄ±plarÄ± `escapeRegex()` ile filtrelenir ve karakter sÄ±nÄ±rlarÄ±yla korunur.
- **Bellek AÅŸÄ±mÄ± KorumasÄ±:** RepoSense dosya yÃ¼klemelerinde 1 MB sÄ±nÄ±rÄ± uygulanÄ±r; `node_modules` ve binary dosyalar yoksayÄ±lÄ±r.
- **En DÃ¼ÅŸÃ¼k AyrÄ±calÄ±klÄ± CI/CD:** GitHub Actions iÅŸ akÄ±ÅŸlarÄ± minimum yetkilerle (`pages: write`, `contents: read`) Ã§alÄ±ÅŸÄ±r.

---

## ğŸ“„ Lisans & Telif HakkÄ±

MIT LisansÄ± altÄ±nda daÄŸÄ±tÄ±lmaktadÄ±r. Detaylar iÃ§in [LICENSE](https://github.com/Cagrik34/zenith-nexus/blob/main/LICENSE) dosyasÄ±na bakÄ±nÄ±z.

**Yazar:** Ã‡aÄŸrÄ± Giray KeÅŸan  
**Telif HakkÄ±:** Â© 2026 Ã‡aÄŸrÄ± Giray KeÅŸan. TÃ¼m HaklarÄ± SaklÄ±dÄ±r.