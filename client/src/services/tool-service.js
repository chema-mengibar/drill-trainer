import Seq01 from './sequences/seq-01.json'
import Seq02 from './sequences/seq-02.json'
import Seq03 from './sequences/seq-03.json'
import Seq04 from './sequences/seq-04.json'

import Demo from './sequences/demo.json'

export default class ToolService {

    constructor() {}

    sequences() {
        return [
            Demo,
            Seq01,
            Seq02,
            Seq03,
            Seq04,
        ]
    }

    getSequenceById(id) {
        return this.sequences().find((item) => item.id == id)
    }


}