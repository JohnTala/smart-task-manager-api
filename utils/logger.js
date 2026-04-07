const logger={
    info:(msg)=>{
        console.log(`[INFO]:${msg}`)

    },
    error:(msg)=>{
        console.log(`[ERROR]:${msg}`)
    },
    warning:(msg)=>{
         console.log(`[WARNING]: ${msg}`)
    },
}

module.exports=logger