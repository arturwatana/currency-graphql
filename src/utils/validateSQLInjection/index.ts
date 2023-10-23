

export default function validateSQLInjection(fields: string[]){
    const words = ["SELECT",
    "INSERT",
    "UPDATE",
    "DELETE",
    "DROP",
    "TRUNCATE",
    "UNION",
    "JOIN",
    "WHERE",
    "AND",
    "OR",
    "LIKE",
    "ORDER BY",
    "GROUP BY",
    "HAVING",
    "UNION ALL",
    "INNER JOIN",
    "OUTER JOIN",
    "CASE",
    "WHEN",
    "THEN",
    "ELSE",
    "END",
    "EXISTS",
    "SUBSELECT",
    "LIMIT",
    "OFFSET",
    "LOAD DATA",
    "INTO OUTFILE",
    "FOR UPDATE",
    "FOR READ",]


    fields.forEach(field =>{
        const fieldWords = field.split(" ")
        fieldWords.forEach(field => {
            if(!field){
                return
            }
            words.forEach(word => {
                if(word.toLowerCase() === field.toLowerCase()){
                    throw new Error("Ops, isso nao é permitido por aqui espertinho")
                }
            })
        })
    })

}