"""Builds index.html from index.src.html by inlining generated ornament SVGs (see orn.py)."""
import urllib.parse, re, orn
def inline(vb, body, cls="", stroke=True, extra=""):
    a='fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"' if stroke else 'fill="currentColor"'
    return f'<svg class="{cls}" viewBox="{vb}" {a} aria-hidden="true" focusable="false" {extra}>{body}</svg>'

def traced_svg(path, cls):
    """inline a traced single-path svg (assets/*.svg), recolourable through currentColor"""
    t=open(path,encoding="utf-8").read()
    vb=re.search(r'viewBox="([^"]+)"',t).group(1); d=re.search(r' d="([^"]+)"',t).group(1)
    return f'<svg class="{cls}" viewBox="{vb}" fill="currentColor" aria-hidden="true" focusable="false"><path fill-rule="evenodd" d="{d}"/></svg>'
band=orn.band_svg("#000")
uri="data:image/svg+xml,"+urllib.parse.quote(band,safe="/:=\" ")
uri=uri.replace('"',"'")
rep={
 "{{BAND_URI}}":'url("'+urllib.parse.quote(band.replace('"',"'"),safe="").join(["data:image/svg+xml,",""])+'")',
 "{{ROSETTE}}":inline("-175 -175 350 350",orn.rosette_a(),"rosette",False),
 "{{ROSETTE2}}":inline("-175 -175 350 350",orn.rosette_a(),"rosette",False),
 "{{SHANYRAK}}":traced_svg("../assets/ornaments/shanyrak.svg","ill shanyrak"),
 "{{DOMBRA}}":'<svg class="ill dombra" viewBox="-5 0 110 284" aria-hidden="true" focusable="false">'+orn.dombra_solid()+'</svg>',
 "{{TEA}}":'<svg class="ill tea" viewBox="2 22 264 134" aria-hidden="true" focusable="false">'+orn.tea_solid()+'</svg>',
}
src=open("index.src.html",encoding="utf-8").read()
for k,v in rep.items(): src=src.replace(k,v)
# cache-busting: the shared script is versioned by its mtime, so a stale cached app.js can't pair with a fresh page
import os
for js in ("app.js",):
    v=int(os.path.getmtime("../js/"+js))
    src=src.replace(f'src="js/{js}"',f'src="js/{js}?v={v}"')
open("../index.html","w",encoding="utf-8").write(src)
print("ok",len(src))
