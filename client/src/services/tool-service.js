import DemoJson from './sequences/demo.json'
import { toRaw, reactive } from "vue";

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
                    this.addIds();
                    return this.data.sequence;
                }
            }, (error) => {
                console.error('[ToolService] fetchSeq:', error)
            })
    }

    addIds() {
        const f = this.data.sequence.frames.map(f => {
            f.id = Date.now();
            return f.map(g => {
                g.id = Date.now();

                if (!g.divs) {
                    return g;
                }
                g.divs.map(h => {
                    h.id = Date.now();
                    return h
                })
                return g;
            })

        });
        this.data.sequence.frames = f;
    }

    async saveSeq(data, file) {

        data.frames.forEach(frame => {
            frame.forEach(frameData => {
                if (frameData.type === 'calc' || frameData.type === 'counter') {
                    delete(frameData.divs)
                }
            })
        })

        this.data.sequence = data;

        var fd = new FormData();
        fd.append("drill", file);
        fd.append("id", data.id);
        fd.append("name", data.name);
        fd.append("frames", JSON.stringify(data.frames));
        fd.append("description", data.description);


        return fetch(`${this.domain}/save.php`, {
                method: 'POST',
                headers: {
                    //    'Accept': 'application/json',
                    //    "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
                },
                body: fd //JSON.stringify(data)
            })
            // .then((res) => {
            //     return res.json()
            // })
            .then((resp) => {
                console.log('RESP', resp)
                return resp
            }, (error) => {
                console.error('[ToolService] saveSeq:', error)
            })
    }

    addFrameBefore() {
        const item = [{
            id: Date.now(),
            "type": "action",
            "divs": [{
                id: Date.now(),
                "color": "yellow",
                "icon": "shot"
            }],
            "duration": 5
        }];
        this.data.sequence.frames.unshift(item);
        this.addIds();
    }

    addFrameAfterIdx({ frameIdx }) {
        const f = Number(frameIdx);
        const item = [{
            id: Date.now(),
            "type": "action",
            "divs": [{
                id: Date.now(),
                "color": "blue",
                "icon": "pass"
            }],
            "duration": 5
        }];
        this.data.sequence.frames.splice(f, 0, item);

    }

    addSubFrameBefore({ frameIdx, subFrameIdx }) {
        const f = Number(frameIdx);
        const sf = Number(subFrameIdx);
        console.log(f, sf)
        const item = {
            id: Date.now(),
            "type": "action",
            "divs": [{
                id: Date.now(),
                "color": "green",
                "icon": "shot"
            }],
            "duration": 5
        };
        this.data.sequence.frames[f].splice(sf, 0, item);
        this.addIds();
    }


    addDiv({ frameIdx, subFrameIdx, divIdx }) {
        const f = Number(frameIdx);
        const sf = Number(subFrameIdx);
        const d = Number(divIdx);

        const item = {
            id: Date.now(),
            "color": "green",
            "icon": "shot"
        };
        this.data.sequence.frames[f][sf].divs.splice(d, 0, item);
        this.addIds();
    }


    removeDiv({ frameIdx, subFrameIdx, divIdx }) {
        const f = Number(frameIdx);
        const sf = Number(subFrameIdx);
        const d = Number(divIdx);

        this.data.sequence.frames[f][sf].divs.splice(d, 1);
    }


    removeSubFrame({ frameIdx, subFrameIdx }) {
        const f = Number(frameIdx);
        const sf = Number(subFrameIdx);

        this.data.sequence.frames[f].splice(sf, 1);
    }

    removeFrame({ frameIdx }) {
        const f = Number(frameIdx);


        this.data.sequence.frames.splice(f, 1);
    }


    toRaw(proxy) {
        return JSON.parse(JSON.stringify(proxy))
    }

    create() {
        const unique = `new-${Date.now()}`;
        const dummy = {
            id: unique,
            name: unique,
            description: '-',
            drill: '-',
            frames: [
                [{
                    "type": "action",
                    "divs": [{
                        "color": "red",
                        "icon": "stick"

                    }, {
                        "color": "blue",
                        "icon": "avoid"
                    }],
                    "duration": 5
                }]
            ]

        };
        this.data.sequence = dummy;
        return this.data.sequence;
    }

}