import { Inngest } from "inngest";
import User from "../models/user.js";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "movie-ticket-booking" });


//user data

const syncUserCreation = inngest.createFunction(

    {id:'sync-user-from-clerk'},
    {event: 'clerk/user.created'},
    async ({event})=>{
        const {id,first_name,last_name,email_address,image_url} = event.data

        const userData = {
            _id: id,
            email:email_address[0].email_address,
            name: first_name+''+last_name,
            image:image_url
        } 
        await User.create(userData)
    }

)


//delerting user from database

const syncUserDeletion = inngest.createFunction(

    {id:'delete-user-from-clerk'},
    {event: 'clerk/user.deleted'},
    async ({event})=>{
        const {id} = event.data
        await User.findByIdAndDelete(id)
    }

)

//updating the data

const syncUserUpdate = inngest.createFunction(

    {id:'update-user-from-clerk'},
    {event: 'clerk/user.updated'},
    async ({event})=>{
        const {id,first_name,last_name,email_address,image_url} = event.data

        const userData = {
            _id: id,
            email:email_address[0].email_address,
            name: first_name+''+last_name,
            image:image_url
        } 
        await User.findByIdAndUpdate(id,userData)
    }

)


export const functions = [syncUserCreation,syncUserDeletion,syncUserUpdate];
