# Quick Start Guide

## What We Built

Your Speculative Facebooks site now has **6 new experimental interfaces** plus an exploration hub, totaling over 3,300 lines of new code!

## New Pages Created

### 📍 Navigation Hub
- **[/explore/](/explore/)** - Central hub showcasing all new features

### 🎨 Exploration Modes

1. **[/timeline/](/timeline/)** - Interactive chronological timeline
   - Filter by decade (1940s-2010s)
   - Visual timeline with alternating layouts
   - Click any item to view full details

2. **[/browse/](/browse/)** - Reimagined browsing interface
   - Switch between 4 view modes (Grid/List/Text/Images)
   - Filter by Type, Era, and Content
   - Live statistics

3. **[/network/](/network/)** - Network visualization
   - Interactive force-directed graph
   - Shows temporal and thematic connections
   - Click nodes to explore

4. **[/typography/](/typography/)** - Experimental typography
   - 5 different text presentations
   - Kinetic, Concrete, Spectacle, Drift, Layers
   - Pure CSS + vanilla JS animations

5. **[/scroll-story/](/scroll-story/)** - Narrative scroll experience
   - Parallax effects
   - Word-by-word reveals
   - Immersive journey through decades

6. **[/themes/](/themes/)** - Thematic analysis
   - Key themes with statistics
   - Temporal patterns visualization
   - Featured analytical essays

## How to Build & Run

### Option 1: Local Development
```bash
cd ~/Code/Github/speculative-facebooks

# If bundler version issue, update it:
bundle update --bundler

# Build the site
bundle exec jekyll build

# Serve locally
bundle exec jekyll serve

# Visit http://localhost:4000/speculative-facebooks/
```

### Option 2: GitHub Pages
If your repo is set up for GitHub Pages:
```bash
git add .
git commit -m "Add experimental reimaginings"
git push origin main
```

Site will be live at: https://hawc2.github.io/speculative-facebooks/

## New Menu Structure

The site's main navigation now includes:

```
├── About
├── Exhibits
├── Explorations ⭐ NEW
│   ├── Timeline
│   ├── Reimagined Browse
│   ├── Network of Ideas
│   ├── Typography Experiments
│   ├── Scroll Story
│   └── Thematic Analysis
├── Browse
├── Search
└── Reuse
```

## Features Added

### Visual Design
- Dark mode aesthetics for experimental pages
- Gradient color schemes for each mode
- Smooth animations and transitions
- Responsive layouts (mobile/tablet/desktop)

### Interactions
- Click to explore
- Hover for details
- Scroll for reveals
- Filter and sort
- View mode switching

### Technology
- Pure CSS animations (GPU-accelerated)
- Vanilla JavaScript (no frameworks)
- SVG visualizations
- Intersection Observer for scroll effects
- Force-directed graph simulation

## File Structure

```
speculative-facebooks/
├── pages/
│   ├── timeline.md          (Timeline view)
│   ├── browse.md            (Reimagined browse)
│   ├── network.md           (Network graph)
│   ├── typography.md        (Typography experiments)
│   ├── scroll-story.md      (Scroll narrative)
│   ├── themes.md            (Thematic analysis)
│   └── explore.md           (Navigation hub)
├── _layouts/
│   └── post_layout.html     (Custom layouts for items)
├── _config.yml              (Updated menu)
├── ENHANCEMENTS.md          (Full documentation)
└── QUICKSTART.md            (This file)
```

## Customization Ideas

### Easy Tweaks
1. **Colors**: Change gradient values in each page's `<style>` section
2. **Animations**: Adjust durations and easing functions
3. **Text**: Update intro text and descriptions
4. **Filters**: Add more filter categories in browse.md

### Advanced
1. **Add Real AI Analysis**: Replace sample themes with GPT/Claude analysis
2. **User Preferences**: Save view modes to localStorage
3. **More Visualizations**: Add charts, heatmaps, etc.
4. **Interactive Annotations**: Let users add notes
5. **Export Features**: Download filtered data as JSON/CSV

## Testing Checklist

- [ ] Visit `/explore/` and click through all cards
- [ ] Try timeline filtering by decade
- [ ] Switch between browse view modes
- [ ] Click nodes in network graph
- [ ] Switch typography styles
- [ ] Scroll through scroll-story
- [ ] Explore theme cards
- [ ] Test on mobile device
- [ ] Check all menu links work
- [ ] Verify image loading

## Troubleshooting

**Q: Pages show without styling**
A: Check that Jekyll is processing .scss files and CSS is loading

**Q: Animations don't work**
A: Check browser console for JavaScript errors

**Q: Images don't load**
A: Verify paths are correct for your baseurl

**Q: Menu doesn't show new items**
A: Rebuild the site after updating _config.yml

## Next Steps

1. **Build the site** to generate HTML
2. **Test locally** to ensure everything works
3. **Customize** colors/text to your preference
4. **Deploy** to GitHub Pages or your host
5. **Share** and get feedback!

## Philosophy

Each exploration mode offers a different lens:
- **Timeline**: Historical progression
- **Browse**: User control and flexibility
- **Network**: Hidden relationships
- **Typography**: Text as art
- **Scroll**: Narrative immersion
- **Themes**: Analytical depth

Together, they transform a collection into an experience.

---

Created with Claude Code
February 8, 2026
