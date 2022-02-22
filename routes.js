const express = require('express')
const routes = express.Router()

routes.get('/', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        conn.query('SELECT * FROM ahorro', (err, rows)=>{
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})

routes.get('/:id', (req, res)=>{
    const { id } = req.params

    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        conn.query('SELECT * FROM ahorro WHERE id = ?', [id], (err, rows)=>{
            if(err) return res.send(err)

            res.json(rows)
        })
    })
}
)

routes.post('/', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('INSERT INTO ahorro set ?', [req.body], (err, rows)=>{
            if(err) return res.send(err)

            res.send('ahorro add')
        })
    })
})

routes.delete('/:id', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('DELETE FROM ahorro WHERE id = ?', [req.params.id], (err, rows)=>{
            if(err) return res.send(err)

            res.send('ahorro excluded!')
        })
    })
})

routes.put('/:id', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('UPDATE ahorro set ? WHERE id = ?', [req.body, req.params.id], (err, rows)=>{
            if(err) return res.send(err)

            res.send('ahorro updated!')
        })
    })
})

module.exports = routes