// // import { a } from '../nodejsEx/appTwo.js'

// import { ab } from '../nodejsEx/mainServer.js'
// // a()
// // // ab()

const a = ms => new Promise(resolve => setTimeout(resolve, ms))

const b = () => new Date().getTime()
console.log(b() - 1000);
async function main() {
    const hello = b();
    await Promise.all([a(1000), a(1000)])
    console.log(b() - hello)
    await a(1000)
    await a(1000)
    console.log(b() - hello)
}

main()