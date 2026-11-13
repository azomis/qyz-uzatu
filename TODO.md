# TODO: смена домена

После покупки домена: добавить его в Settings → Pages → Custom domain, настроить DNS у регистратора по подсказке GitHub и включить Enforce HTTPS.
Затем заменить `https://azomis.github.io/qyz-uzatu/` на новый адрес в `og:image` и `og:url` в `src/index.src.html`, выполнить `cd src && python3 build.py`, закоммитить и запушить.
