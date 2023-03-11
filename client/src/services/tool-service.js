export default class ToolService {

    domain = '//drill-trainer-server.motuo.info'

    sequences = []
    sequence = null

    constructor() {}

    sequences() {
        return this.sequences;
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



    async fetchSeq(id) {
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
                    this.sequence = jsonResponse.data
                    return this.sequence;
                }
            }, (error) => {
                console.error('[ToolService] fetchSeq:', error)
            })
    }


}