// Single pattern

import { ACCESS_TOKEN_KEY, USER_STORAGE_KEY } from "@/constants/auth.constants"
import { StorageService } from "../services/storage.service"

/**
 * Store class implements the Singleton pattern, providing a centralized storage and state management solution. 
 * It manages user login/logout and notifies observes of any changes in the state.   
 */
export class Store {

    /**
     * Create a new Store instance
     * @param {Object} initialState - the initial state for the store
     */
    constructor(initialState){
        this.observers = []

        this.storageService = new StorageService()
        const savedUser = this.storageService.getItem(USER_STORAGE_KEY)
        
        const state = savedUser ?  {user: savedUser} : initialState

        this.state = new Proxy(state, {
            set: (target, property, value) => {
                target[property] = value
                this.notify()
                return true
            }
        })
    }

    /**
     * Get the singleton instance fo the Store. 
     * @returns {Store} The singleton instance of the Store. 
     */
    static getInstance(){
        if(!Store.instance){
            Store.instance = new Store({user: null})
        }
        return Store.instance
    }

    /**
     * Add an observer to the store list of observers. 
     * @param {Object} observer - The observer object to add. 
     */
    addObserver(observer){
        this.observers.push(observer)
    }

    /**
     * Remove an observer to the store list of observers. 
     * @param {Object} observer - The observer object to remove. 
     */
    removeObserver(observer){
        this.observers= this.observers.filter(obs => obs != observer)
    }

    /**
     * Notify all observers of the state changes. 
     */
    notify(){
        for (const observer of this.observers) {
            observer.update()
        }
    }

    /**
     * Log in and update the state and storage service. 
     * @param {Object} user - The user object to log in. 
     */
    login(user, accessToken){
        this.state.user = user
        this.storageService.setItem(USER_STORAGE_KEY, user)
        this.storageService.setItem(ACCESS_TOKEN_KEY, accessToken)
    }

    /**
     * Log out and update the state and storage service. 
     */
    logout(user){
        this.state.user = null
        this.storageService.removeItem(USER_STORAGE_KEY)
        this.storageService.removeItem(ACCESS_TOKEN_KEY)
    }

    /**
     * Update user card. 
     * @param {Object} card - The card object. 
     */
    updateCard(card){
        const oldUser = this.state.user
        const newUser = { ...oldUser, card }
        this.state.user = newUser
        this.storageService.setItem(USER_STORAGE_KEY, newUser)
    }
}