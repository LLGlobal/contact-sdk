# LianLian Global Platform Contact SDK

## Installation

##### Option 1: Use llg-sdk-contact

Install with NPM

```bash
npm install llg-sdk-contact
```

Or, with Yarn

```bash
yarn add llg-sdk-contact
```

#### Option 2: Import as a static resource

Staging:
```html
<script src="https://eu-ewallet-share-bucket.lianlianglobal.com/sdk/contact/v1/prod/index.min.js" />
```

Prod:
```html
<script src="https://eu-ewallet-share-bucket.lianlianglobal.com/sdk/contact/v1/prod/index.min.js" />
```

## Initialization

```ts
<div id="llg-contact"></div>

import { init } from 'llg-sdk-contact';

const options = {
    el: '#llg-contact',
    env: 'prod',
    langKey: 'en',
    token: 'Bearer US_3AT4IwessFmm8H1FYBmV04tHiKMCy',
    mountedCb: () => {},
    successCb: () => {},
    failedCb: () => {},
}

await init(options);

// Or
await window.LLGContact.init(options);
```


| Option         | Type     | Required? | Default value | Description                                                                                                                                                         |
| :------------- | :------- | :-------- | :------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `el`          | `string` | **YES**    | -       | SDK mounts to the  DOM, eg: `#llg-contact`,
| `env`          | `string` | **NO**    | `prod`        | LianLian Global environment you want to integrate your application with. Options include: `staging`, `prod`                                                   |
| `langKey`      | `string` | **NO**    | `en`          | Language. Options include: `en`                                                                                                                             |
| `token`     | `string` | **YES**   | -             | Bearer US_xxx |
| `mountedCb` | `function` | **NO**   | -             | Executed when the SDK loads successfully |
| `successCb` | `function` | **NO**   | -             | Execute after the KYC information is successfully submitted |
| `failedCb` | `function` | **NO**   | -             | Executed after KYC information submission fails |



## Destroy Contact SDK
```ts
import { destroy } from 'llg-sdk-contact';

destroy();

// Or
window.LLGContact.destroy();
```