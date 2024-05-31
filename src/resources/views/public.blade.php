<!doctype html>
<html lang="lv">

    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>{{ $title }}</title>
        <link
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
            rel="stylesheet"
            integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
            crossorigin="anonymous"
        >
    </head>

    <body>

        <header class="navbar navbar-dark bg-dark mb-5 sticky-top">
            <div class="container">
                <span class="navbar-brand mb-0 h1">{{ $title }}</span>
            </div>
        </header>

        <main class="container">
            <div id="root"></div>
        </main>

        <div class="container">
            <footer class="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
                <div class="col-md-4 d-flex align-items-center">
                    <span class="mb-3 mb-md-0 text-body-secondary">K. Immers, VeA, 2024</span>
                </div>
            </footer>
        </div>

        @viteReactRefresh
        @vite('resources/js/index.jsx')

    </body>

</html>
