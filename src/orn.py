"""Ornament generator for variant-4: tulip motif traced from ref.png (rosette + border) and line illustrations."""
import math

TULIP='M-23.6 -1.2C-33.2 -3.1 -40.7 -8.7 -45.0 -17.1C-47.0 -21.1 -47.6 -23.6 -47.8 -28.6C-48.1 -35.7 -47.2 -39.5 -43.0 -50.2C-40.1 -57.5 -39.4 -60.2 -39.4 -64.3C-39.4 -73.8 -45.2 -80.7 -54.1 -81.9L-56.1 -82.1L-53.6 -83.8C-36.8 -94.9 -14.2 -82.4 -11.8 -60.7C-10.4 -48.0 -17.3 -38.3 -25.1 -42.2C-28.0 -43.7 -29.3 -48.3 -27.6 -51.3C-26.8 -52.9 -27.2 -52.9 -29.0 -51.5C-33.4 -48.1 -34.3 -42.6 -31.2 -38.1C-30.2 -36.6 -27.3 -34.5 -25.9 -34.2C-24.7 -33.9 -24.7 -33.9 -26.2 -32.3C-26.8 -31.5 -27.9 -29.7 -28.6 -28.3C-30.3 -24.9 -30.4 -19.6 -29.0 -16.5C-26.7 -11.8 -23.0 -9.4 -17.4 -9.2C-13.8 -9.0 -13.4 -9.3 -15.9 -10.4C-18.8 -11.8 -20.2 -14.6 -20.2 -18.9C-20.2 -23.3 -18.8 -26.8 -15.1 -31.7C-10.6 -37.5 -9.7 -39.0 -8.2 -42.0C-2.7 -53.3 -4.0 -67.5 -11.5 -78.6C-14.6 -83.3 -21.1 -88.9 -25.2 -90.5C-26.9 -91.2 -26.9 -90.9 -25.6 -93.5C-21.6 -101.5 -17.0 -106.2 -5.5 -113.8L0.2 -117.6L6.1 -113.6C15.0 -107.7 18.3 -104.8 21.9 -100.1C23.6 -97.9 27.2 -91.5 26.9 -91.2C26.9 -91.2 25.8 -90.6 24.6 -90.0C12.5 -84.0 4.3 -69.0 5.2 -54.5C5.6 -46.7 8.2 -40.7 14.3 -32.9C18.9 -27.0 20.8 -22.3 20.5 -17.9C20.2 -14.3 18.1 -11.0 15.4 -10.0C13.6 -9.4 14.5 -9.0 17.6 -9.2C29.2 -9.6 34.4 -22.5 26.6 -31.8C25.0 -33.8 25.0 -33.7 26.8 -34.5C34.1 -37.5 35.5 -47.1 29.3 -51.6C27.6 -52.8 27.5 -52.7 28.1 -51.1C30.7 -45.0 24.5 -39.2 18.5 -42.2C13.1 -44.9 10.4 -55.7 12.7 -64.6C18.2 -84.8 38.2 -94.1 54.0 -83.8L56.5 -82.1L53.7 -81.7C49.8 -81.1 47.5 -79.9 44.8 -77.2C41.1 -73.5 39.7 -69.7 39.7 -63.7C39.7 -59.2 40.4 -56.5 43.5 -49.3C47.4 -40.2 48.8 -34.1 48.4 -28.2C47.1 -9.2 26.8 4.4 10.7 -3.0C6.7 -4.8 2.6 -9.1 0.8 -13.3L0.3 -14.5L-0.9 -12.1C-3.2 -7.6 -7.5 -3.9 -12.4 -2.1C-14.6 -1.3 -21.2 -0.8 -23.6 -1.2ZM1.0 -69.1C1.5 -72.4 3.5 -78.4 5.1 -81.8C7.6 -87.0 10.3 -90.1 15.0 -92.9C15.6 -93.3 15.6 -93.4 14.7 -94.3C12.8 -96.4 9.5 -97.0 6.9 -95.9L5.7 -95.4L6.0 -96.9C6.9 -101.7 5.9 -105.4 2.6 -109.8C0.2 -112.9 0.3 -112.9 -2.5 -109.2C-5.6 -105.3 -6.6 -101.7 -5.7 -97.7C-5.4 -96.4 -5.2 -95.4 -5.2 -95.4C-5.3 -95.4 -5.8 -95.7 -6.4 -96.0C-8.8 -97.1 -13.0 -96.2 -14.4 -94.1C-14.9 -93.3 -14.9 -93.2 -14.1 -92.7C-9.6 -89.7 -7.2 -87.0 -4.7 -82.1C-3.0 -78.6 -1.3 -73.2 -0.5 -69.0C0.2 -65.4 0.4 -65.4 1.0 -69.1Z'
LEAVES='M-58.3 44.2C-61.2 44.0 -66.4 41.8 -68.6 39.8C-76.1 32.9 -76.4 19.7 -69.3 11.6C-67.5 9.5 -67.5 9.6 -69.0 9.1C-80.0 5.5 -91.4 -6.4 -94.5 -17.5C-96.0 -23.1 -96.5 -30.9 -95.6 -35.1C-95.5 -35.5 -95.3 -36.4 -95.2 -36.9C-94.9 -38.7 -93.4 -43.1 -93.0 -43.3C-92.9 -43.4 -92.7 -43.0 -92.7 -42.2C-92.7 -37.7 -88.7 -28.5 -84.3 -23.3C-75.8 -12.9 -66.1 -7.0 -48.0 -1.2C-28.3 5.1 -16.5 13.8 -9.8 27.0C-6.9 32.6 -4.8 39.3 -7.1 35.5C-8.1 33.8 -11.8 29.0 -12.9 28.0C-13.4 27.5 -13.7 27.0 -13.6 26.7C-13.4 26.3 -13.5 26.2 -13.9 26.4C-14.5 26.6 -15.3 25.9 -15.4 25.1C-15.4 24.8 -15.6 24.4 -15.7 24.3C-15.8 24.2 -15.9 24.4 -15.7 24.7C-15.5 25.5 -15.9 25.4 -16.7 24.6C-17.1 24.1 -17.1 24.0 -16.8 23.8C-16.6 23.8 -16.6 23.7 -17.0 23.8C-17.3 23.9 -18.4 23.3 -19.3 22.6C-31.1 14.1 -44.7 13.2 -51.9 20.7C-57.9 26.8 -56.2 36.3 -48.3 40.2L-46.1 41.3L-47.4 42.0C-50.1 43.7 -54.4 44.5 -58.3 44.2ZM53.6 44.1C52.1 43.9 48.3 42.4 47.1 41.6C46.5 41.2 46.6 41.1 48.0 40.5C58.5 35.8 58.5 22.9 47.9 17.5C37.0 12.1 20.1 18.7 9.6 32.5C8.6 33.8 7.6 35.4 7.2 36.1C6.3 38.0 6.3 36.7 7.3 33.8C11.5 21.2 20.2 11.5 33.4 4.7C38.1 2.3 40.0 1.6 49.9 -1.8C69.2 -8.3 79.6 -15.3 87.2 -27.0C90.2 -31.7 93.0 -38.6 93.1 -41.4C93.1 -44.5 94.6 -41.2 95.7 -35.8C98.6 -21.7 92.2 -5.9 79.8 3.4C77.1 5.4 70.2 9.1 69.1 9.1C67.9 9.1 68.1 9.7 69.7 11.8C74.0 17.1 75.9 24.9 74.3 30.7C71.9 39.9 62.9 45.7 53.6 44.1ZM-1.1 28.9C-1.8 27.7 -2.5 26.3 -2.7 25.8C-2.9 25.2 -3.4 24.2 -3.7 23.4C-5.9 18.3 -5.7 11.2 -3.2 5.4C-2.2 3.3 -0.0 -0.3 0.3 -0.3C0.4 -0.3 1.1 0.8 1.9 2.1C6.8 10.7 7.0 18.3 2.6 26.9C0.4 31.4 0.4 31.4 -1.1 28.9Z'

def P(d,e=''): return f'<path d="{d}" {e}/>'
def leaf(y0,y1,w,b=.5):
    m=y0+(y1-y0)*b;q=y0+(y1-y0)*.22
    return f"M0 {y0}C{w*1.5:.1f} {q:.1f} {w*1.25:.1f} {m:.1f} 0 {y1}C{-w*1.25:.1f} {m:.1f} {-w*1.5:.1f} {q:.1f} 0 {y0}Z"
def diamond(x,y,a,b): return f"M{x} {y-b}L{x+a} {y}L{x} {y+b}L{x-a} {y}Z"
def rot(g,n,off=0,r=0,s=1):
    return "".join(f'<g transform="rotate({k*360/n+off}) translate(0 {-r}) scale({s})">{g}</g>' for k in range(n))

def tulip(): return P(TULIP,'fill-rule="evenodd"')+P(LEAVES,'fill-rule="evenodd"')
YT,YB=-118,47   # vertical extent of the tulip motif

def rosette_a(n=8,r=106,s=.34):
    g=rot(tulip(),n,0,r,s)
    g+=rot(P(leaf(-4,-30,6)),n,180/n)+'<circle r="4"/>'
    g+=rot(P(diamond(0,-1,5,11)),n,180/n,r-YT*s+16)
    return g

BAND_W=190
BAND_H=round((YB-YT)*.55+12,1)
BAND_Y0=0
def band_tile(Pw=BAND_W):
    s=.55;h=(YB-YT)*s
    g=f'<g transform="translate({Pw/2} {-YT*s+6}) scale({s})">{tulip()}</g>'
    for x in (0,Pw): g+=P(diamond(x,h/2+6,4.5,10))
    return g
def band_svg(color="#000"):
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 {BAND_Y0} {BAND_W} {BAND_H}" width="{BAND_W}" height="{BAND_H}"><g fill="{color}">{band_tile()}</g></svg>'

# ---------- line illustrations (stroke = currentColor) ----------
def shanyrak():
    """yurt crown (top view): perforated double ring with scalloped lace, two crossed double beams,
    hub with 8-petal flower, 4 tulips (site motif) in the quadrants, uyk ribs and dots"""
    o=[]
    # outer rings + perforations for the uyks
    o.append('<circle r="95"/><circle r="87" stroke-width="1.2"/>')
    for k in range(36):
        a=math.radians(k*10+5)
        o.append(f'<circle cx="{math.cos(a)*91:.1f}" cy="{math.sin(a)*91:.1f}" r="1.5" fill="currentColor" stroke="none"/>')
    # scalloped lace ring (r 77..85)
    n=36;d=''
    for k in range(n):
        a0=math.radians(k*360/n);a1=math.radians((k+1)*360/n);am=(a0+a1)/2
        x0,y0=math.cos(a0)*77,math.sin(a0)*77;x1,y1=math.cos(a1)*77,math.sin(a1)*77
        cx,cy=math.cos(am)*87,math.sin(am)*87
        d+=f'M{x0:.1f} {y0:.1f}A5.6 5.6 0 0 1 {x1:.1f} {y1:.1f}'
    o.append(f'<path d="{d}" stroke-width="1.8"/>')
    o.append('<circle r="77" stroke-width="2"/>')
    # quadrant ram-horn (qoshqar muiz) motif, pointing outward along the diagonals
    HORN="M0 9C0 -1 -5 -5 -12 -5C-20 -5 -23 -15 -16 -19C-10 -21 -6 -15 -11 -13"
    for k in range(4):
        g=(f'<path d="{HORN}"/><path d="{HORN}" transform="scale(-1 1)"/>'
           '<path d="M0 8C-6 -3 -4 -17 0 -29C4 -17 6 -3 0 8Z" fill="currentColor" stroke-width="1.2"/>'
           '<circle cx="-11.5" cy="-14.5" r="1.8" fill="currentColor" stroke="none"/><circle cx="11.5" cy="-14.5" r="1.8" fill="currentColor" stroke="none"/>')
        o.append(f'<g transform="rotate({45+k*90}) translate(0 -41) scale(1.12)" stroke-width="2">{g}</g>')
    # quadrant dots between tulip and ring
    for k in range(4):
        a=math.radians(45+k*90)
        o.append(f'<circle cx="{math.cos(a)*70:.1f}" cy="{math.sin(a)*70:.1f}" r="2.2" fill="currentColor" stroke="none"/>')
    # two crossed double beams (kept above the ribs/tulips with a paper-coloured under-stroke)
    for rot_ in (0,90,180,270):
        o.append(f'<g transform="rotate({rot_})">'
                 '<path d="M25 -5H77V5H25" stroke-width="2.4"/>'
                 '<path d="M40 0l5 -3.2 5 3.2 -5 3.2zM58 0l5 -3.2 5 3.2 -5 3.2z" stroke-width="1.1" fill="currentColor"/>'
                 '</g>')
    # hub
    o.append('<circle r="25" stroke-width="3"/><circle r="19.5" stroke-width="1.2"/>')
    pet=''.join(f'<g transform="rotate({k*45})"><path d="M0 -3C5 -7 5 -13 0 -17.5C-5 -13 -5 -7 0 -3Z" fill="currentColor" stroke="none"/></g>' for k in range(8))
    o.append(pet+'<circle r="2.6" stroke-width="1.4"/>')
    return "".join(o)

def dombra():
    """dombra: pear body with inner contour and ram-horn inlay, tapered neck with frets,
    bent headstock with two staggered pegs, two strings, bridge, tailpiece (lines only, currentColor)"""
    BODY="M43 146C40 172 10 190 8 230C7 258 28 276 50 276C72 276 93 258 92 230C90 190 60 172 57 146Z"
    SC="M0 15C-11 9 -13 -6 -5 -12C3 -17 12 -11 9 -4C7 1 0 0 1.5 -5"   # scroll, mirrored for the other side
    o=[f'<path d="{BODY}"/>',
       f'<path d="{BODY}" transform="translate(50 215) scale(.88) translate(-50 -215)" stroke-width="1.2"/>']
    # neck + frets
    o.append('<path d="M43 146V50M57 146V50"/>')
    o.append(''.join(f'<path d="M43 {y}H57"/>' for y in range(60,141,10)).replace('<path','<path stroke-width="1.2"',) )
    # headstock (scroll-back) and staggered pegs
    o.append('<path d="M43 50C43 38 45 26 52 14C55 9 60 8 62 12C64 16 59 18 57 24C56 30 57 40 57 50Z"/>')
    o.append('<path d="M43 36H33M57 28H67" stroke-width="2.6"/><circle cx="30.5" cy="36" r="3.2"/><circle cx="69.5" cy="28" r="3.2"/>')
    # strings, bridge, tailpiece
    o.append('<path d="M47 50V238M53 50V238" stroke-width="1.1"/>')
    o.append('<path d="M34 238H66" stroke-width="3.4"/>')
    o.append('<path d="M50 246l6 7 -6 7 -6 -7z" fill="currentColor" stroke-width="1"/>')
    # ram-horn inlay on both sides of the strings
    o.append(f'<g transform="translate(31 207) scale(.72)" stroke-width="2.6"><path d="{SC}"/><circle cx="-1" cy="-8" r="2.2" fill="currentColor" stroke="none"/></g>')
    o.append(f'<g transform="translate(69 207) scale(-.72 .72)" stroke-width="2.6"><path d="{SC}"/><circle cx="-1" cy="-8" r="2.2" fill="currentColor" stroke="none"/></g>')
    o.append('<circle cx="50" cy="180" r="1.6" fill="currentColor" stroke="none"/><circle cx="50" cy="168" r="1.6" fill="currentColor" stroke="none"/>')
    return "".join(o)

def tea():
    return ('<path d="M44 78C44 60 62 52 80 52S116 60 116 78V104C116 128 98 142 80 142S44 128 44 104Z"/>'
            '<path d="M60 52C60 42 70 38 80 38S100 42 100 52"/><path d="M76 38C76 30 78 28 80 26S84 30 84 38"/>'
            '<path d="M116 78C132 74 144 62 150 42 152 36 146 34 142 40 134 54 126 62 116 66"/>'
            '<path d="M44 82C30 82 22 92 24 104 26 116 36 120 46 118"/>'
            '<path d="M56 154H104"/>'
            '<path d="M180 90C180 118 196 138 218 138S256 118 256 90Z"/><path d="M204 150H232"/><path d="M218 138V150"/>'
            '<path d="M200 74C190 64 206 58 198 46M218 78C208 66 224 58 216 44M236 74C226 64 242 58 234 46" stroke-width="2"/>'
            '<path d="M190 100H246" stroke-width="1.2"/>')



# ================= solid "cut-out" illustrations in the style of the traced shanyrak =================
import re as _re

def _bird_d():
    """the 'bird' motif of the traced shanyrak (island contour #24), recentred on (0,0), pointing up, ~123 x 101 units"""
    t=open("../assets/ornaments/shanyrak.svg",encoding="utf-8").read()
    d=_re.search(r' d="([^"]+)"',t).group(1)
    sub=[x for x in _re.split(r'(?=M)',d) if x.strip()][24]
    return _re.sub(r'(-?\d+\.?\d*) (-?\d+\.?\d*)',lambda m:f"{float(m.group(1))-369.5:.1f} {float(m.group(2))-240.5:.1f}",sub)
BIRD=_bird_d()

def spiral(cx,cy,r0,r1,turns,w0,w1,a0=0,sgn=1,n=70):
    """tapered ram-horn curl: filled polygon along an Archimedean spiral, width w0 -> w1"""
    L=[];R=[]
    for i in range(n+1):
        t=i/n;a=a0+sgn*t*turns*2*math.pi;r=r0+(r1-r0)*t;w=(w0+(w1-w0)*t)/2
        x,y=cx+math.cos(a)*r,cy+math.sin(a)*r
        nx,ny=math.cos(a),math.sin(a)
        L.append((x+nx*w,y+ny*w));R.append((x-nx*w,y-ny*w))
    pts=L+R[::-1]
    return "M"+"L".join(f"{x:.1f} {y:.1f}" for x,y in pts)+"Z"

def horn(cx,cy,r0=4,r1=11,turns=1.15,w0=3.6,w1=.8,mirror=False,a0=None):
    """one curl; the open end sweeps outward, mirror=True flips it around x=cx"""
    if a0 is None: a0=math.pi*.9
    d=spiral(cx,cy,r0,r1,turns,w0,w1,a0 if not mirror else math.pi-a0,-1 if mirror else 1)
    return f'<path d="{d}"/>'

def _wrap(vb,mid,cut,solid):
    x,y,w,h=vb
    return (f'<defs><mask id="{mid}" maskUnits="userSpaceOnUse" x="{x}" y="{y}" width="{w}" height="{h}">'
            f'<rect x="{x}" y="{y}" width="{w}" height="{h}" fill="#fff"/><g fill="#000" stroke="#000" stroke-linecap="round" stroke-linejoin="round">{cut}</g></mask></defs>'
            f'<g mask="url(#{mid})" fill="currentColor">{solid}</g>')

def _bird(x,y,s,flip=False): return f'<g transform="translate({x} {y}) scale({s} {-s if flip else s})" stroke="none"><path d="{BIRD}"/></g>'

def dombra_solid():
    BODY="M43 146C41 168 5 190 5 230C5 260 27 279 50 279C73 279 95 260 95 230C95 190 59 168 57 146Z"
    solid=(f'<path d="{BODY}"/>'
           '<path d="M42.5 146V46H57.5V146Z"/>'
           '<path d="M42.5 46L41 20C41 10 44.5 5 50 5C55.5 5 59 10 59 20L57.5 46Z"/>'
           '<path d="M41.5 38H31V33.6H41.5ZM58.5 28H69V23.6H58.5Z"/><circle cx="29" cy="35.8" r="4.4"/><circle cx="71" cy="25.8" r="4.4"/>')
    cut=(f'<path d="{BODY}" transform="translate(50 232) scale(.9) translate(-50 -232)" fill="none" stroke-width="1.8"/>'
         '<path d="M47 52V206M53 52V206" stroke-width="1.5" fill="none"/>'
         + "".join(f'<path d="M42 {y}H58" stroke-width="1.5" fill="none"/>' for y in range(62,140,13))
         + '<path d="M37 206H63" stroke-width="3.6" fill="none"/>'
         + _bird(50,244,.52)
         + horn(41.5,176,3,8.5,1.2,2.4,.6,mirror=True)+horn(58.5,176,3,8.5,1.2,2.4,.6)
         )
    return _wrap((-5,0,110,284),"m-dombra",cut,solid)

def tea_solid():
    POT="M30 96C30 70 52 56 78 56C104 56 126 70 126 96C126 122 108 140 78 140C48 140 30 122 30 96Z"
    BOWL="M168 84H262C262 120 241 138 215 138C189 138 168 120 168 84Z"
    solid=(f'<path d="{POT}"/>'
           '<path d="M52 58C52 44 64 38 78 38C92 38 104 44 104 58Z"/><circle cx="78" cy="31" r="6.5"/>'
           '<path d="M120 78C140 78 152 64 158 42C159 38 166 40 165 46C160 80 144 108 120 114Z"/>'
           '<path d="M34 78C14 76 6 90 8 104C10 118 22 124 36 120L38 112C30 114 22 111 21 103C20 94 26 88 36 90Z"/>'
           '<path d="M52 140H104L98 152H58Z"/>'
           f'<path d="{BOWL}"/><path d="M196 138H234L240 152H190Z"/>')
    cut=(f'<path d="{POT}" transform="translate(78 98) scale(.86) translate(-78 -98)" fill="none" stroke-width="1.8"/>'
         + _bird(78,98,.32,True)
         + horn(51,104,3.2,9,1.2,3.0,.7,mirror=True)+horn(105,104,3.2,9,1.2,3.0,.7)
         + '<path d="M60 56H96" stroke-width="1.6" fill="none"/>'
         + '<path d="M176 94H254" stroke-width="2" fill="none"/>'
         + _bird(215,114,.28,True)
         + horn(186,112,3,8.5,1.2,2.8,.7,mirror=True)+horn(244,112,3,8.5,1.2,2.8,.7)
         )
    return _wrap((0,10,280,160),"m-tea",cut,solid)
