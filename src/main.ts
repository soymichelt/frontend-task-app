import { bootstrapApplication } from '@angular/platform-browser';
import * as Sentry from '@sentry/angular-ivy';

import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { environment } from './app/environments/environment';

Sentry.init({
  dsn: environment.sentry.dsn,
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
  ],
  tracesSampleRate: 1.0,
  tracePropagationTargets: environment.sentry.targets,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});

bootstrapApplication(AppComponent, appConfig).catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err);
});
