import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { MercadoPagoConfig, Payment, Preference } from 'mercadopago';
const bodyParser = require('body-parser');

const client = new MercadoPagoConfig({
  accessToken: 'TEST-8204142312016245-032918-bff6d30183178f367a2152ab6cbe8166-174005798',
  options: {
    timeout: 5000,
    idempotencyKey: 'abc'
  }
});

const preference = new Preference(client);

const serverDistFolder = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = resolve(serverDistFolder, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();

/**
 * Example Express Rest API endpoints can be defined here.
 * Uncomment and define endpoints as necessary.
 *
 * Example:
 * ```ts
 * app.get('/api/**', (req, res) => {
 *   // Handle API request
 * });
 * ```
 */

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

app.use(bodyParser.json());

app.post('/create-payment-link', async (req, res) => {
  const products = req.body.products;
  console.log('create payment link server res: ', products)

  const body = {
    body: {
      items: products,
      binary_mode: true,
      shipments: {
        cost: 50,
        mode: 'not_specified'
      },
      back_urls: {
        success: 'http://localhost:4000/success',
        pending: 'http://localhost:4000/pending',
        failure: 'http://localhost:4000/failure',
      },
      auto_return: 'approved',
      statement_descriptor: 'Esto es una descripción del negocio de prueba'
    }
  }

  try {
    const response = await preference.create(body);
    res.json({ paymentLink: response.init_point });
  } catch (error: any) {
    console.error('Error al crear el pago:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use('/**', (req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

/**
 * Start the server if this module is the main entry point.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url)) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app);
