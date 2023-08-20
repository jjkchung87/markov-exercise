/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.wordPairs = Object.keys(this.makeChains())
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    let chain = {}

    this.words.forEach((value, index) =>{
      if(this.words[index+1] !== undefined){
        
        const string = value+" "+ this.words[index+1]
        
        if(chain[string]){
          if(!chain[string].includes(this.words[index+2])){
          chain[string].push(this.words[index+2])}
        } else {
          chain[string] = [this.words[index+2]]
        }
      }
    })

    return chain    
  }


  /** return random text from chains */

  makeText(numWords = 100) {
    let text = ""
    const chain = this.makeChains()

    for(let i=0; i < numWords/3; i++){
      const randomIndex = Math.floor(Math.random()*this.wordPairs.length)
      const pair = this.wordPairs[randomIndex]
      text += pair+" "
      let randomNextWordIndex = Math.floor(Math.random()*chain[pair].length)
      while(chain[pair][randomNextWordIndex] === undefined){
        randomNextWordIndex = Math.floor(Math.random()*chain[pair].length)
      }
      const nextWord = chain[pair][randomNextWordIndex]
      text += nextWord+ " "
    }
    return text    
  }

  *generateWords(numWords = 100){
    const chain = this.makeChains()
    const wordPairs = this.wordPairs

    for(let i=0; i < numWords/3; i++){
      const randomIndex = Math.floor(Math.random()*wordPairs.length)
      const pair = this.wordPairs[randomIndex]
      const [firstWord, secondWord] = pair.split(" ")

      yield firstWord
      yield secondWord

      let randomNextWordIndex = Math.floor(Math.random()*chain[pair].length)

      while(chain[pair][randomNextWordIndex] === undefined){
        randomNextWordIndex = Math.floor(Math.random()*chain[pair].length)
      }
      
      const nextWord = chain[pair][randomNextWordIndex]

      yield nextWord
    }
  }
}

let mm = new MarkovMachine('the cat in the hat is in the hat')

let generator = mm.generateWords()



module.exports = {MarkovMachine}
