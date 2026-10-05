# Theme System

## Player Themes

The player page theme is controlled by the server config `theme` (applied after saving) and can be overridden per-URL with `?theme=`.

11 built-in themes: `bili` (Bilibili-style, default), `bilibili` (deep blue & pink), `sakura` (cherry pink & white), `ocean` (deep sea blue), `sunset` (sunset orange), `forest` (forest green), `mono` (minimal black & white), `cyber` (neon cyberpunk), `shoujo` (shojo manga), `jrpg` (JRPG), `neon` (neon samurai).

## Admin Themes

The admin theme is controlled by the `adminTheme` config, applies **instantly** and is saved locally (localStorage). 11 built-in themes: `md3` (Material Design 3, default), `bilibili`, `cyber`, `forest`, `jrpg`, `mono`, `neon`, `ocean`, `sakura`, `shoujo`, `sunset`.

Player and admin each have their own theme list (the two directories are independent; names need not match).

## Theme Endpoints

- `GET /api/theme/{type}/list`: theme list (`type` = `player` / `admin`)
- `GET /api/theme/{type}.css`: stylesheet for the current theme (e.g. `/api/theme/bili.css`)

## Theme Structure

Theme files live in the `theme/` directory:

```
theme/
├── admin.css            # admin base styles (generated)
├── player.css           # player base styles (generated)
├── build.js             # build script (merges theme.json + style.css)
├── admin/<theme>/       # admin themes (theme.json variables + style.css component styles)
└── player/<theme>/      # player themes (theme.json variables + style.css)
```

Each theme directory consists of `theme.json` (CSS variables) and `style.css` (component styles).

## Custom Themes

1. Copy `theme/admin/<theme>/` to a custom name
2. Edit the CSS variables in `theme.json` (colors, radius, etc.) and component styles in `style.css`
3. Run `node theme/build.js` to regenerate `admin.css` / `player.css`

See `public/CUSTOM_THEME.md` in the repository for details.
