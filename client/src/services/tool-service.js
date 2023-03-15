import DemoJson from './sequences/demo.json'
import { isProxy, reactive } from "vue";

export default class ToolService {

    domain = '//drill-trainer-server.motuo.info'

    sequences = []
    data = reactive({
        sequence: null
    })



    constructor() {}

    sequences() {
        return this.sequences;
    }

    getSequence() {
        return this.data.sequence;
    }



    getSequenceById(id) {
        return this.sequences().find((item) => item.id == id)
    }

    getImagePath(fileName) {
        return `${this.domain}/images/${fileName}`
    }

    async fetchSeqs() {
        return fetch(`${this.domain}/sequences.php`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            })
            .then((res) => {
                return res.json()
            })
            .then((jsonResponse) => {
                if (jsonResponse.data) {
                    this.sequences = jsonResponse.data;
                    return this.sequences;
                }
            }, (error) => {
                console.error('[ToolService] fetchSeqs:', error)
            })
    }

    async fetchSeq(id, useDemoData = false) {
        if (useDemoData) {
            return DemoJson
        }

        return fetch(`${this.domain}/sequence.php?id=${id}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            })
            .then((res) => {
                return res.json()
            })
            .then((jsonResponse) => {
                if (jsonResponse.data) {
                    this.data.sequence = jsonResponse.data
                    this.map()
                    return this.data.sequence;
                }
            }, (error) => {
                console.error('[ToolService] fetchSeq:', error)
            })
    }

    map() {
        const f = this.data.sequence.frames.map(f => {
            f.id = crypto.randomUUID();
            return f.map(g => {
                g.id = crypto.randomUUID();
                g.divs.map(h => {
                    h.id = crypto.randomUUID();
                    return h
                })
                return g;
            })

        });
        this.data.sequence.frames = f;
    }

    async saveSeq(data) {
        console.log(data)
        return fetch(`${this.domain}/save.php`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
                },
                body: JSON.stringify(data)
            })
            // .then((res) => {
            //     return res.json()
            // })
            .then((jsonResponse) => {
                console.log('RESP', jsonResponse)
                return jsonResponse
            }, (error) => {
                console.error('[ToolService] saveSeq:', error)
            })
    }

    addFrameBefore() {
        const item = [{
            id: crypto.randomUUID(),
            "type": "action",
            "divs": [{
                id: crypto.randomUUID(),
                "color": "yellow",
                "icon": "shot"
            }],
            "duration": 5
        }];
        this.data.sequence.frames.unshift(item);
        this.map();
    }

}