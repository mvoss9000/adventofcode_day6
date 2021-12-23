const fs = require('fs')

function shift_moms (a) {
    let ret = a[0]
    for (let i=1; i<a.length; i++) {
        a[i-1] = a[i]
    }
    return ret
}

class School {
    constructor (expected_days) {
        this.moms = new Array(7).fill(0)
        expected_days.forEach(ed => {
            this.moms[ed]++
        })
        this.first_time_moms = new Array(9).fill(0)
    }

    age1day () {
        let mom0 = shift_moms(this.moms)
        let ftm0 = shift_moms(this.first_time_moms)
        this.moms[6] = mom0 + ftm0              // ftm0 join the ranks of experienced moms
        this.first_time_moms[8] = mom0 + ftm0   // a new mom for every mom0
    }

    total_count () {
        let tmom = this.moms.reduce((t, c) => {
           return t + c
        }, 0)
        let tftmom = this.first_time_moms.reduce((t, c) => {
            return t + c
        }, 0)

        return tmom + tftmom
    }


    to_string () {
        return `moms:${this.moms} ftmoms:${this.first_time_moms}`
    }
}

function parse_counts (line) {
    return line.split(',').map(ns => parseInt(ns))
}

module.exports = {
    parse_counts: parse_counts,
}

if (require.main === module) {
    let file = fs.readFileSync('./data.txt', 'utf8')
    let expected_days = parse_counts(file)
    let school = new School(expected_days)

    for (let d = 0; d < 256; d++) {
        school.age1day()
        console.log(`day:${d+1} ${school.to_string()} total:${school.total_count()}`)
        // console.log(`day:${d}  counts:${counts}   fishies:${fishies.length}`)
    }
}
