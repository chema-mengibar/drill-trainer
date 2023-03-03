import Seq01Json from './sequences/seq01.json'
import Seq01LinialJson from './sequences/seq01-linial.json'
import Seq02Json from './sequences/seq02.json'

export default class ToolService {

    constructor() {


        console.log(Seq01Json)
    }



    sequences() {
        return [
            Seq02Json,
            Seq01Json,
            Seq01LinialJson,
        ]
    }

    getSequenceById(id) {
        return this.sequences().find((item) => item.id == id)
    }


}