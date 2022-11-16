# Custom Titlebar in Electron

## What does this do?
It adds a custom titlebar to an example electron application.
You can even customize it via css.

## How to install 🔨

### Clone this repository
```
git clone git@github.com:helloimdome/electron-custom-titlebar.git
```

### Move into root
```
cd electron-custom-titlebar
```

### Install packages with your preferred manager
Yarn
```
yarn install
```

npm
```
npm install
```

### Run the application
Yarn 
```
yarn start
```

npm
```
npm start
```

## Troubleshooting ❓
When running Electron on Linux there is a problem regarding the sandbox environment.
```
sudo chown root chrome-sandbox
chmod 4755 chrome-sandbox
```
