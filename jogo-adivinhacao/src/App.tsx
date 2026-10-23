import styles from "./app.module.css"
import { useEffect, useState } from "react"

import { WORDS, type Challenge } from "./utils/words"

import { Header } from "./components/Header"
import { Tip } from "./components/Tip"
import { Letter } from "./components/Letter"
import { Input } from "./components/Input"
import { Button } from "./components/Button"
import { LettersUsed, type LettersUsedProps } from "./components/LettersUsed"

export default function App(){

  const [attempts, setAtempts] = useState(0)
  const [challenge, setChallenge] = useState<Challenge | null>(null)
  const [letter, setLetter] = useState("")
  const [lettersUsed, setLettersUsed] = useState<LettersUsedProps[]>([])

  function handleRestartGame(){
    alert("Reiniciar o jogo")
  }

  function startGame(){
    const index = Math.floor(Math.random() * WORDS.length)
    const randomWord = WORDS[index]

    setChallenge(randomWord)

    setAtempts(0)
    setLetter("")
  }

  function handleConfirm(){
    if (!challenge){
      return
    }

    if(!letter.trim()){
      return alert("Digite uma letra!")
    }

    const value = letter.toUpperCase()
    
    const exists = lettersUsed.find((used) => used.value.toUpperCase() === value)

    if(exists){
      return alert("Você já usou essa letra " + value)
    }

    setLettersUsed((prevState) => [...prevState, {value, correct: false}])

    setLetter("")
  }

  useEffect(() => {
    startGame()
  }, [])

  if(!challenge){
    return
  }

  return (
    <div className={styles.container}>
      <main>
        <Header current={attempts} max={10} onRestart={handleRestartGame}></Header>
        <Tip tip="Linguagem de programação dinamica"></Tip>

        <div className={styles.word}>
          {
            challenge.word.split("").map(() => (
              <Letter value=""></Letter>
            ))
          }
        </div>

        <h4>Palpite</h4>

        <div className={styles.guess}>
          <Input 
            autoFocus 
            maxLength={1} 
            placeholder="?" 
            value={letter}
            onChange={(e) => setLetter(e.target.value)}>
          </Input>

          <Button title="Confirmar" onClick={handleConfirm}></Button>
        </div>

        <LettersUsed data={lettersUsed}></LettersUsed>
      </main>
    </div>
  )
}