# Pokemon Card App

This project is a mobile application developed to display, manage, and store Pokemon cards locally. It is built using **Expo** and powered by modern React Native tools.

# Note
I used the Async Storage library for storage. React-native-mmkv is faster and recommended, but I chose Async Storage so the app can be tested with Expo Go without a client. I’d consider adding it for production.

# ScreenShots

<p float="left"> 
<img src="https://github.com/user-attachments/assets/1a0115e4-bcc2-4214-a2a3-caa4474d849a" alt="alt text" width="250" height="600">
<img src="https://github.com/user-attachments/assets/b565dece-fd97-48be-8c48-86b6b16a1a9b" alt="alt text" width="250" height="600">

</p>

# Pokemon Card App

Built with React Native Expo

# Features
- View Pokemon card list and details
- Save cards locally
- Fast API requests with caching
- Simple state management
- Optimized image loading

# Technologies
- **Expo**
- **Expo Image**: Fast image loading
- **Zustand**: state management
- **TanStack Query**: API handling
- **Async Storage**: Local storage

# Installation
- Clone: `git clone https://github.com/Ozantunaa/pokemon-by`
- Install: `npm install`
- Run: `npx expo start`

# Usage
- Open app to see Pokemon cards
- Tap a card for details
- Press save to store it locally with **Async Storage**
