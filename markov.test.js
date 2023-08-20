const {MarkovMachine} = require('./markov')

describe("test word list", () => {
   
    test("for a normal sentence", () => {
        let mm = new MarkovMachine("Hello my name is Arlo")
        let words = mm.words
        expect(words).toContain('Arlo');
        expect(words.length).toEqual(5);
    })
})

describe("test word chain", () => {

    test("for a phrase with no repeating words", () => {
        let mm = new MarkovMachine("I am Sam")
        let wordChain = mm.makeChains()
        expect(Object.keys(wordChain).length).toEqual(mm.words.length)
        expect(Object.keys(wordChain).length).toEqual(3)
        })
    
    test("for a phrase with repeating words", () => {
        let mm = new MarkovMachine("the cat in the hat is in the hat")
        let wordChain = mm. makeChains();
        expect(wordChain['the'].length).toEqual(2)
    })
})