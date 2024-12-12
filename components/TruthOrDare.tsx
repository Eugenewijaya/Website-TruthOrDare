'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Play, RotateCw } from 'lucide-react'
import { motion, useAnimation } from 'framer-motion'
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"

const initialQuestions = {
  truth: [
    "Apa hal paling malu yang pernah kamu lakukan di depan teman-teman?",
    "Siapa orang yang bikin kamu baper banget belakangan ini?",
    "Kalau kamu bisa ubah satu hal di hidupmu, itu apa?",
    "Pernah stalk akun gebetan atau mantan? Ceritain!",
    "Hal apa yang bikin kamu paling insecure?",
    "Siapa nama gebetan terakhir yang kamu stalk di Instagram?",
    "Pernah pura-pura suka sama sesuatu biar dianggap keren? Ceritain dong.",
    "Kalau boleh milih, kamu mau jadi anak Sultan atau influencer terkenal?",
    "Apa hal paling bikin kamu insecure banget akhir-akhir ini?",
    "Pernah gak kamu diem-diem jealous sama sahabat sendiri? Kenapa?",
    "Siapa yang sering bikin kamu senyum tanpa alasan?",
    "Kalau punya kesempatan ngomong sama mantan, apa yang mau kamu bilang?",
    "Apa alasan paling random kamu nolak ajakan nongkrong?",
    "Siapa yang jadi crush rahasia kamu sekarang?",
    "Pernah bohong sama temen buat nutupin kesalahan?",
    "Hal apa yang bikin kamu malu banget waktu kecil?",
    "Pernah stalk akun gebetan selama berjam-jam? Ceritain!",
    "Kalau kamu jadi presiden sehari, apa hal pertama yang bakal kamu lakukan?",
    "Siapa yang jadi role model kamu selama ini?",
    "Apa hal paling aneh yang pernah kamu lakukan pas sendirian?",
    "Pernah bohong pas main game biar menang?",
    "Kalau kamu harus move ke negara lain, kamu bakal pilih ke mana?",
    "Apa rahasia yang belum pernah kamu ceritain ke siapa pun?",
    "Pernah jatuh cinta sama orang yang gak mungkin? Ceritain dong.",
    "Siapa temen yang paling ngeselin tapi kamu tetep suka dia?",
    "Kalau kamu punya kekuatan super, kamu mau pilih apa?",
    "Pernah mikirin skenario balikan sama mantan?",
    "Apa kebohongan terbesar yang pernah kamu bilang ke orang tua?",
    "Hal paling ngaco apa yang pernah kamu lakukan pas kelas online?",
    "Siapa yang menurut kamu temen paling bisa dipercaya?",
    "Apa sifat jelek kamu yang susah banget diubah?",
    "Pernah gak ngerasa jadi orang paling gak paham sama hidup ini?",
    "Apa hal yang bikin kamu nyesel sampai sekarang?",
    "Siapa orang yang paling bikin kamu nyaman?",
    "Apa hal paling bodoh yang pernah kamu lakukan buat orang lain?",
    "Kalau harus pilih, kamu lebih rela kehilangan HP atau internet?",
    "Pernah punya fake account buat kepoin orang?",
    "Kalau kamu bisa nyuruh temenmu buat diem selamanya, siapa yang bakal kamu pilih?",
    "Hal pertama yang kamu pikirin pas bangun pagi biasanya apa?",
    "Apa kebiasaan paling aneh yang cuma kamu yang tahu?",
    "Kalau ketemu artis favorit, kamu bakal ngapain?",
    "Apa makanan yang bikin kamu gak bisa berhenti makan?",
    "Kalau bisa jadi invisible selama sehari, apa yang bakal kamu lakukan?",
    "Apa playlist lagu kamu buat nangis sendirian?",
    "Pernah ketahuan bohong pas lagi ngomong? Ceritain.",
    "Siapa orang terakhir yang bikin kamu marah banget?",
    "Pernah naksir orang yang jauh lebih tua?",
    "Apa hal pertama yang bakal kamu lakukan kalau menang lotre?",
    "Siapa yang menurut kamu pasangan paling bucin di grup ini?",
    "Apa impian masa kecil yang pengen banget kamu wujudin?",
    "Siapa yang jadi alasan kamu males nongkrong kadang-kadang?",
    "Apa barang yang kamu sayang banget sampai gak bisa dibuang?",
    "Pernah ngerasa overthinking banget sampai lupa makan?",
    "Apa kata yang sering banget kamu ucapin sehari-hari?",
    "Siapa orang yang paling sering kamu kepoin di medsos?",
  ],
  dare: [
    "Nyanyiin lagu favorit kamu dengan suara paling kencang!",
    "Kirim pesan ke gebetan kamu bilang, 'Aku suka kamu.'",
    "Lakukan dance TikTok favorit kamu sekarang!",
    "Screenshot chat terakhir kamu dengan orang spesial dan tunjukin.",
    "Jelasin gebetan kamu pakai satu kata aja.",
    "Post story selfie dengan caption 'Aku ganteng/cantik banget ya, kan?'",
    "Kirim pesan ke gebetan bilang, 'Aku kangen kamu!'",
    "Lakukan pose TikTok viral dan rekam sekarang juga.",
    "Nyanyiin lagu kesukaan kamu pakai suara bebek.",
    "Screenshot chat terakhir sama mantan dan tunjukin ke temen.",
    "Makan sesuatu dengan kombinasi aneh (misalnya roti sama saus sambal).",
    "Kirim pesan acak ke orang yang terakhir kamu chat, bilang 'Aku cinta kamu.'",
    "Tiru gaya ngomong temen di grup ini selama 5 menit.",
    "Upload foto random di story kamu dan kasih caption aneh.",
    "Lari keliling ruangan sambil teriak, 'Aku juara dunia!'",
    "Pakai filter paling jelek di HP kamu dan upload ke story.",
    "Ceritakan rahasia kecil kamu ke semua orang di grup.",
    "Kirim voice note nyanyi lagu galau ke temen terdekat kamu.",
    "Ganti nama kontak salah satu temen jadi 'My Crush.'",
    "Kirim pesan ke orang random di kontak kamu bilang, 'Kangen deh!'",
    "Minum segelas air dengan satu napas tanpa henti.",
    "Posting foto lama yang paling memalukan di story kamu.",
    "Lakukan tarian robot selama satu menit tanpa ketawa.",
    "Ceritakan pengalaman paling cringe yang pernah kamu alami.",
    "Panggil salah satu temen dengan nama aneh selama 5 menit.",
    "Kirim pesan ke dosen/guru bilang, 'Terima kasih udah sabar sama saya.'",
    "Bikin pantun tentang temen yang ada di sebelah kamu.",
    "Like semua foto di akun Instagram seseorang.",
    "Ceritakan pengalaman patah hati terburuk kamu dengan detail.",
    "Buat ekspresi muka aneh dan kirim selfie-nya ke grup.",
    "Pakai pakaian terbalik selama 5 menit.",
    "Ajakin seseorang main Truth or Dare lewat DM sekarang.",
    "Teriak nama crush kamu sambil nari.",
    "Kirim pesan voice note 'Aku suka kamu' ke salah satu orang di grup.",
    "Tutup mata kamu dan biarin temen pilih satu makanan untuk kamu makan.",
    "Berikan alasan kenapa kamu harus dapet award 'terbaik.'",
    "Gayain rambut temen kamu kayak seleb K-pop.",
    "Tunjukkin last search history kamu di browser.",
    "Kirim chat random ke mantan dengan teks, 'Masih inget aku?'",
    "Selfie dengan ekspresi bingung dan kirim ke semua grup.",
    "Kirim chat suara bilang 'Aku manusia paling keren sedunia!'",
    "Lakukan gerakan push-up selama 10 detik.",
    "Buat cerita karangan tentang temen di sebelah kamu.",
    "Ubah wallpaper HP kamu jadi meme selama 24 jam.",
    "Tiru suara karakter kartun favorit kamu.",
    "Kirim pesan 'Aku lagi baper' ke grup keluarga kamu.",
    "Minum segelas air sambil cerita sesuatu tanpa berhenti.",
    "Ganti username Instagram kamu jadi 'King/Queen of Bucin' selama 1 hari.",
    "Jalan mundur ke dapur dan ambil makanan sambil ngomong lucu.",
    "Rekam dirimu nyanyi lagu anak-anak dengan semangat.",
    "Buat kalimat pickup line dan kirim ke seseorang random.",
    "Ceritakan pengalaman lucu yang bikin semua orang ketawa.",
    "Ikuti gaya seleb TikTok favorit kamu sekarang juga.",
    "Pura-pura jadi selebriti selama 1 menit.",
    "Katakan ke salah satu temen, 'Aku suka kamu' dan liat reaksi mereka.",
  ],
}

export default function TruthOrDare() {
  const [gameState, setGameState] = useState<'start' | 'flip' | 'spin' | 'question'>('start')
  const [currentQuestion, setCurrentQuestion] = useState('')
  const [coinResult, setCoinResult] = useState<'truth' | 'dare' | null>(null)
  const [questions, setQuestions] = useState(initialQuestions)
  const [showAlert, setShowAlert] = useState(false)
  const [showQuestion, setShowQuestion] = useState(false)
  const [spinCount, setSpinCount] = useState(0)
  const [showPromo, setShowPromo] = useState(false)
  const coinControls = useAnimation()
  const wheelControls = useAnimation()
  
  const [coinFlipSound, setCoinFlipSound] = useState<HTMLAudioElement | null>(null)
  const [popupSound, setPopupSound] = useState<HTMLAudioElement | null>(null)

  useEffect(() => {
    const loadAudio = async () => {
      try {
        const coinAudio = new Audio('/sounds/coin-flip.mp3')
        const popAudio = new Audio('/sounds/popup.mp3')
        await Promise.all([
          new Promise(resolve => coinAudio.addEventListener('canplaythrough', resolve, { once: true })),
          new Promise(resolve => popAudio.addEventListener('canplaythrough', resolve, { once: true }))
        ])
        setCoinFlipSound(coinAudio)
        setPopupSound(popAudio)
      } catch (error) {
        console.error('Failed to load audio:', error)
      }
    }
    loadAudio()
  }, [])

  const startGame = () => {
    setGameState('flip')
    flipCoin()
  }

  const flipCoin = async () => {
    if (coinFlipSound) coinFlipSound.play().catch(e => console.error('Error playing coin flip sound:', e))
    const result = Math.random() < 0.5 ? 'truth' : 'dare'
    setCoinResult(result)
    await coinControls.start({ 
      rotateY: 720, 
      transition: { duration: 1 } 
    })
    setGameState('spin')
  }

  const spinWheel = async () => {
    await wheelControls.start({ 
      rotate: 720 + Math.random() * 360,
      transition: { duration: 2, ease: "easeInOut" }
    })
    const availableQuestions = questions[coinResult!]
    if (availableQuestions.length === 0) {
      setShowAlert(true)
      return
    }
    const randomIndex = Math.floor(Math.random() * availableQuestions.length)
    const newQuestion = availableQuestions[randomIndex]
    setCurrentQuestion(newQuestion)
    setQuestions(prev => ({
      ...prev,
      [coinResult!]: prev[coinResult!].filter((_, index) => index !== randomIndex)
    }))
    setGameState('question')
    setShowQuestion(true)
    if (popupSound) popupSound.play().catch(e => console.error('Error playing popup sound:', e))
    
    setSpinCount(prev => {
      const newCount = prev + 1
      if (newCount % 20 === 0) {
        setShowPromo(true)
      }
      return newCount
    })

    speakQuestion(coinResult!, newQuestion)
  }

  const resetGame = () => {
    setGameState('flip')
    setCoinResult(null)
    setCurrentQuestion('')
    setShowQuestion(false)
    flipCoin()
  }

  const restartGame = () => {
    setQuestions(initialQuestions)
    setShowAlert(false)
    resetGame()
  }

  const speakQuestion = (type: 'truth' | 'dare', question: string) => {
    const utterance = new SpeechSynthesisUtterance()
    utterance.text = `${type === 'truth' ? 'Jujur' : 'Tantangan'}. ${question}`
    utterance.lang = 'id-ID'
    speechSynthesis.speak(utterance)
  }

  useEffect(() => {
    if (gameState === 'spin') {
      spinWheel()
    }
  }, [gameState])

  return (
    <div className="w-full max-w-md">
      {gameState === 'start' && (
        <Button onClick={startGame} size="lg" className="w-full text-xl bg-black text-white hover:bg-gray-800">
          <Play className="mr-2 h-5 w-5" /> Mulai Main!
        </Button>
      )}

      {(gameState === 'flip' || gameState === 'spin') && (
        <div className="text-center">
          <motion.div
            animate={coinControls}
            className="w-40 h-40 bg-black rounded-full mx-auto mb-8 flex items-center justify-center cursor-pointer shadow-lg"
          >
            <span className="text-4xl font-bold text-white">
              {coinResult === 'truth' ? 'T' : coinResult === 'dare' ? 'D' : '?'}
            </span>
          </motion.div>
          {gameState === 'spin' && (
            <motion.div
              animate={wheelControls}
              className="w-60 h-60 bg-gray-800 rounded-full mx-auto mb-8 flex items-center justify-center cursor-pointer shadow-lg"
            >
              <span className="text-4xl font-bold text-white">Spin!</span>
            </motion.div>
          )}
        </div>
      )}

      {gameState === 'question' && (
        <Button onClick={resetGame} size="lg" className="w-full text-lg bg-black text-white hover:bg-gray-800">
          <RotateCw className="mr-2 h-5 w-5" /> Putar Koin
        </Button>
      )}

      <AlertDialog open={showAlert} onOpenChange={setShowAlert}>
        <AlertDialogContent className="bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Semua Pertanyaan Sudah Dijawab!</AlertDialogTitle>
            <AlertDialogDescription>
              Kamu sudah menjawab semua pertanyaan. Mau main lagi dari awal?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={restartGame} className="bg-black text-white hover:bg-gray-800">Main Lagi</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Dialog open={showQuestion} onOpenChange={setShowQuestion}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle>{coinResult === 'truth' ? 'Jujur' : 'Tantangan'}</DialogTitle>
            <DialogDescription>{currentQuestion}</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <AlertDialog open={showPromo} onOpenChange={setShowPromo}>
        <AlertDialogContent className="bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Follow Sosial Media Saya!</AlertDialogTitle>
            <AlertDialogDescription>
              Terima kasih sudah bermain! Jangan lupa follow sosial media saya untuk konten seru lainnya.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setShowPromo(false)} className="bg-black text-white hover:bg-gray-800">OK</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

