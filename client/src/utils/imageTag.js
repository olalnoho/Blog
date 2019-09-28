const parse = string => {
   return string.replace(/\[\/?IMG\]/g, (match) => {
      switch(match) {
         case '[IMG]':
            return '<img src="'
         case '[/IMG]':
            return '">'
      }
   })
}