import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { useMutation } from "convex/react";

export const createUser=mutation({
    args:{
        email:v.string(),
        userName:v.string(),
        imageUrl:v.string()
    },
    handler:async(ctx, args)=>{
        const user=await ctx.db.query('users')
        .filter((q)=>q.eq(q.field('email'), args.email))
        .collect();

        if(user?.length==0){
            await ctx.db.insert('users',{
                email:args.email,
                userName:args.userName,
                imageUrl:args.imageUrl,
                upgrade:false
            });

            return 'Inserted New User...'
        }
    }
})

export const userUpgardePlan=/*useMutation*/query({
    args:{
        userEmail:v.string()
    },
    handler:async(ctx,args)=>{
        const result=await ctx.db.query('users').filter(q=>q.eq(q.field('email'),args.userEmail)).collect();
        if(result){
            await ctx.db.patch(result[0]._id,{upgrade:true});
            return 'success'
        }
        return 'error'
    }
})

export const GetUserInfo=query({
    args:{
        userEmail:v.optional(v.string())
    },
    handler:async(ctx,args)=>{
        if(!args.userEmail){
            return;
        }
        const result=await ctx.db.query('users').filter(q=>q.eq(q.field('email'),args.userEmail)).collect();
        return result[0];
    }
})