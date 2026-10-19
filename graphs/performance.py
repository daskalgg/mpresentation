# Performance and accuracy vs. number of rays (thesis, Results tables 1-4)
# Run: python graphs/performance.py  ->  graphs/performance.png, graphs/md.png
import os
import matplotlib.pyplot as plt

HERE = os.path.dirname(os.path.abspath(__file__))
RAYS = [2048, 8192, 131072]
ROOMS = {
    'Cube 1000 m³': {'desktop': [26, 39, 180],  'phone': [196, 376, 3867], 'isimpa': [2712, 2880, 3451],  'md': [7.3, 6.3, 2.9]},
    'Cube 8000 m³': {'desktop': [32, 53, 867],  'phone': [211, 430, 4784], 'isimpa': [2639, 2809, 3662],  'md': [14.2, 8.3, 6.5]},
    'Elliptical':   {'desktop': [60, 81, 932],  'phone': [418, 771, 5524], 'isimpa': [3150, 3408, 19695], 'md': [8.8, 4.6, 3.3]},
    'L-shaped':     {'desktop': [43, 58, 892],  'phone': [248, 384, 4269], 'isimpa': [2614, 2854, 3228],  'md': [4.2, 2.2, 0.8]},
}
SERIES = [
    ('desktop', 'Ours: desktop', '#2a78d6'),
    ('phone', 'Ours: smartphone', '#eb6834'),
    ('isimpa', 'I-Simpa: desktop', '#1baf7a'),
]
ROOM_COLORS = ['#2a78d6', '#eb6834', '#1baf7a', '#eda100']
INK, MUTED, GRID = '#0b0b0b', '#52514e', '#e4e3df'

plt.rcParams.update({
    'font.family': 'DejaVu Sans', 'font.size': 11, 'text.color': INK,
    'axes.edgecolor': MUTED, 'axes.labelcolor': MUTED, 'xtick.color': MUTED, 'ytick.color': MUTED,
    'axes.spines.top': False, 'axes.spines.right': False, 'axes.grid': True,
    'grid.color': GRID, 'grid.linewidth': 0.8, 'axes.axisbelow': True,
})


def style_x(ax):
    ax.set_xscale('log', base=2)
    ax.set_xticks(RAYS, ['2048', '8192', '131072'])
    ax.minorticks_off()


# Computation time: one panel per room, shared log y-axis
fig, axes = plt.subplots(1, 4, figsize=(13, 4), sharey=True, dpi=200)
for ax, (room, d) in zip(axes, ROOMS.items()):
    for key, label, color in SERIES:
        ax.plot(RAYS, d[key], color=color, linewidth=2, marker='o', markersize=6,
                markeredgecolor='white', markeredgewidth=1.5, label=label)
    ax.set_yscale('log')
    style_x(ax)
    ax.set_title(room, fontsize=12, color=INK)
    ax.set_xlabel('Rays')
axes[0].set_ylabel('Computation time (ms, log scale)')
handles, labels = axes[0].get_legend_handles_labels()
fig.legend(handles, labels, loc='upper center', ncol=3, frameon=False, bbox_to_anchor=(0.5, 1.02))
fig.tight_layout(rect=(0, 0, 1, 0.92))
fig.savefig(os.path.join(HERE, 'performance.png'), transparent=True)

# Absolute mean SPL difference to I-Simpa
fig, ax = plt.subplots(figsize=(7, 4), dpi=200)
LABEL_NUDGE = {'Elliptical': 6, 'Cube 1000 m³': -6}
for (room, d), color in zip(ROOMS.items(), ROOM_COLORS):
    ax.plot(RAYS, d['md'], color=color, linewidth=2, marker='o', markersize=6,
            markeredgecolor='white', markeredgewidth=1.5, label=room)
    ax.annotate(room, (RAYS[-1], d['md'][-1]), xytext=(8, LABEL_NUDGE.get(room, 0)), textcoords='offset points',
                va='center', fontsize=10, color=INK)
style_x(ax)
ax.set_xlim(1600, 600000)
ax.set_ylim(0, 15)
ax.set_xlabel('Rays')
ax.set_ylabel('|Mean SPL difference| (dB)')
ax.legend(frameon=False, loc='upper right', fontsize=10)
fig.tight_layout()
fig.savefig(os.path.join(HERE, 'md.png'), transparent=True)
