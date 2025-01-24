import './assets/main.css'
import '@finos/perspective-viewer/dist/css/pro.css';

import perspective from "@finos/perspective";
import perspective_viewer from "@finos/perspective-viewer";
import "@finos/perspective-viewer-datagrid";
import "@finos/perspective-viewer-d3fc";

import SERVER_WASM from "@finos/perspective/dist/wasm/perspective-server.wasm?url";
import CLIENT_WASM from "@finos/perspective-viewer/dist/wasm/perspective-viewer.wasm?url";


async function start() {

    await Promise.all([
	perspective.init_server(fetch(SERVER_WASM)),
	perspective_viewer.init_client(fetch(CLIENT_WASM)),
    ]);

    const response = await fetch("/example.arrow");
    const dataset = await response.arrayBuffer();

    const worker = await perspective.worker()
    const table = await worker.table(dataset);

    const viewer1 = document.getElementById("viewer1");
    await viewer1.load(table);
}

await start();

