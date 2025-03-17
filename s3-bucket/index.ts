
import {FmBackend} from './services/backend'


// layer of abstracton
// services
// resources


function main() {
    
    new FmBackend({
        name: 'avatars',
        product: "sass"
    })
}

main()