import styles from "./app.module.css"
import { useEffect, useState } from "react"

import { WORDS, type Challenge } from "./utils/words"

import { Header } from "./components/Header"
import { Tip } from "./components/Tip"
import { Letter } from "./components/Letter"
import { Input } from "./components/Input"
import { Button } from "./components/Button"
import { LettersUsed } from "./components/LettersUsed"

export default function App(){

  const [attempts, setAtempts] = useState(0)
  const [challenge, setChallenge] = useState<Challenge | null>(null)
  const [letter, setLetter] = useState("")

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

  useEffect(() => {
    startGame()
  }, [])

  return (
    <div className={styles.container}>
      <main>
        <Header current={attempts} max={10} onRestart={handleRestartGame}></Header>
        <Tip tip="Linguagem de programação dinamica"></Tip>
        <div className={styles.word}>
          <Letter value="R"></Letter>
        </div>

        <h4>Palpite</h4>

        <div className={styles.guess}>
          <Input autoFocus maxLength={1} placeholder="?"></Input>
          <Button title="Confirmar"></Button>
        </div>

        <LettersUsed></LettersUsed>
      </main>
    </div>
  )
}