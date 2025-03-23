# Pokemon Card App

This project is a mobile application developed to display, manage, and store Pokemon cards locally. It is built using Expo and powered by modern React Native tools.

# Features
Listing and viewing details of Pokemon cards
Saving cards to local storage
Fast and cached API requests
Lightweight and performance-focused state management
Optimized image loading

# Technologies Used
Expo: Used as the core framework to streamline the React Native development experience.
Expo Image: Implemented for fast and optimized image loading.
Zustand: A lightweight and simple state management solution to handle the app's state.
TanStack Query: Utilized for efficient API requests, caching, and synchronization.
Async Storage: Employed to store Pokemon cards locally on the device.

# Installation
Clone the repository: git clone https://github.com/Ozantunaa/pokemon-by
Install dependencies: npm install
Start the Expo project: npx expo start

# Usage
Upon launching the app, a list of Pokemon cards will be displayed.
Tap on a card to view its details.
Press the Save button to store your Saved cards, which will be saved locally using Async Storage.
State management with Zustand ensures optimized app performance.
API requests are cached and offline access is supported via TanStack Query.