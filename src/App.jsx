import { useMemo, useState } from 'react'
import './App.css'

const QUESTIONS_KEY = 'askbox.questions'
const USER_KEY = 'askbox.userId'
const DATA_VERSION_KEY = 'askbox.dataVersion'
const DATA_VERSION = '2026-08-20-title-body-anonymous'

const text = {
  anonymous: '\uc775\uba85',
  author: '\uc791\uc131\uc790',
  alreadyAsked: '\uc624\ub298 \uc9c8\ubb38\uc740 \uc774\ubbf8 \ub4f1\ub85d\ud588\uc5b4\uc694. \ub0b4\uc77c 00:00 \uc774\ud6c4 \ub2e4\uc2dc \uc9c8\ubb38\ud560 \uc218 \uc788\uc2b5\ub2c8\ub2e4.',
  alreadyAskedShort: '\uc624\ub298 \uc9c8\ubb38\uc740 \uc774\ubbf8 \ub4f1\ub85d\ud588\uc5b4\uc694. \ub0b4\uc77c \ub2e4\uc2dc \uc9c8\ubb38\ud574 \uc8fc\uc138\uc694.',
  askbox: 'askbox',
  brandLabel: '\uc775\uba85 \uc9c8\uc758\ud568',
  body: '\uc0c1\uc138 \ub0b4\uc6a9',
  bodyHint: '\ubc30\uacbd\uc774\ub098 \uc774\uc720\ub97c \ud568\uaed8 \uc801\uc73c\uba74 \ub354 \uc815\ud655\ud558\uac8c \ub2f5\ubcc0\uc744 \ubc1b\uc744 \uc218 \uc788\uc5b4\uc694.',
  close: '\ub2eb\uae30',
  confirmRegister: '\uc0c8 \uc9c8\ubb38\uc73c\ub85c \ub4f1\ub85d',
  curious: '\ub098\ub3c4 \uad81\uae08\ud574\uc694',
  curiousSuffix: '\uba85\uc774 \uad81\uae08\ud574\uc694',
  curiousSort: '\uacf5\uac10\uc21c',
  duplicateTitle: '\uc720\uc0ac \uc9c8\ubb38 \ubc1c\uacac',
  enteredQuestion: '\ub0b4\uac00 \uc785\ub825\ud55c \uc9c8\ubb38',
  latestSort: '\ucd5c\uc2e0\uc21c',
  listLabel: '\uc9c8\ubb38 \ubaa9\ub85d',
  listTitle: '\uc9c0\uae08 \ub9ce\uc774 \uad81\uae08\ud55c \uc9c8\ubb38',
  modalTitle: '\uc624\ub298\uc758 \uc9c8\ubb38',
  namePublic: '\uc774\ub984 \uacf5\uac1c',
  next: '\ub2e4\uc74c',
  noSimilar: '\ube44\uc2b7\ud55c \uc9c8\ubb38\uc774 \uc5c6\uc5b4\uc694.',
  placeholderBody: '\ubc30\uacbd\uc774\ub098 \uc0c1\uc138\ud55c \ub9e5\ub77d\uc744 \uc801\uc5b4\uc8fc\uc138\uc694.',
  placeholderTitle: '\uc608: \uc810\uc2ec\uc2dc\uac04 \uc5f0\uc7a5 \uacc4\ud68d \uc788\ub098\uc694?',
  privacyMode: '\uacf5\uac1c \ubc29\uc2dd',
  questionCreated: '\uc775\uba85 \uc9c8\ubb38\uc774 \ub4f1\ub85d\ub410\uc5b4\uc694.',
  questionTitle: '\uc81c\ubaa9',
  register: '\ub4f1\ub85d\ud558\uae30',
  similarBody: '\ube44\uc2b7\ud55c \uc9c8\ubb38\uc774 \uc788\uc5b4\uc694.',
  submitAsCurious: '\uc774 \uc9c8\ubb38\uc5d0 \uacf5\uac10\ud558\uace0 \ub9c8\uce58\uae30',
  submitAsNew: '\uc544\ub2c8\uc694, \uc0c8 \uc9c8\ubb38\uc73c\ub85c \ub4f1\ub85d\ud560\uac8c\uc694',
  titleRequired: '\uc81c\ubaa9\uc740 4\uc790 \uc774\uc0c1 \uc785\ub825\ud574 \uc8fc\uc138\uc694.',
  todayPrompt: '\uad81\uae08\ud55c \ub0b4\uc6a9\uc744 \uc785\ub825\ud574 \uc8fc\uc138\uc694.',
  todayStatus: '\uc624\ub298 \ub4f1\ub85d \uc0c1\ud0dc',
  toggleOff: '\uc774\ub984 \uacf5\uac1c',
  toggleOn: '\uc775\uba85',
  totalCurious: '\ub204\uc801 \uacf5\uac10',
  totalQuestions: '\uc804\uccb4 \uc9c8\ubb38',
  undoCurious: '\uacf5\uac10 \ucde8\uc18c',
  untitled: '\uc81c\ubaa9 \uc5c6\uc74c',
  available: '\uc9c8\ubb38 \uac00\ub2a5',
  completed: '\ub4f1\ub85d \uc644\ub8cc',
  duplicateCheck: '\uc720\uc0ac \uc9c8\ubb38 \ud655\uc778',
  writeQuestion: '\uc9c8\ubb38\ud558\uae30',
}

const initialQuestions = [
  {
    id: 'question-1',
    userId: 'sample-user-1',
    authorLabel: text.anonymous,
    title: '\ubcf5\uc9c0\ud3ec\uc778\ud2b8 \uc0ac\uc6a9\ucc98 \ud655\ub300\ub418\ub098\uc694?',
    body: '\ubcf5\uc9c0\ud3ec\uc778\ud2b8\ub97c \uc0ac\uc6a9\ud560 \uc218 \uc788\ub294 \uc81c\ud734\ucc98\uac00 \ub354 \ub298\uc5b4\ub098\ub294\uc9c0 \uad81\uae08\ud569\ub2c8\ub2e4.',
    createdAt: '2026-08-18T09:30:00.000Z',
    curiousUserIds: [
      'sample-user-2',
      'sample-user-3',
      'sample-user-4',
      'sample-user-5',
      'sample-user-6',
    ],
  },
  {
    id: 'question-2',
    userId: 'sample-user-2',
    authorLabel: text.anonymous,
    title: '\uc810\uc2ec\uc2dc\uac04 \uc5f0\uc7a5 \uacc4\ud68d \uc788\ub098\uc694?',
    body: '\ucd5c\uadfc \uc810\uc2ec\uc2dc\uac04\uc774 \ubd80\uc871\ud558\ub2e4\ub294 \uc758\uacac\uc774 \ub9ce\uc544\uc11c \uc5f0\uc7a5 \ub17c\uc758\uac00 \uc788\ub294\uc9c0 \uad81\uae08\ud569\ub2c8\ub2e4.',
    createdAt: '2026-08-19T06:10:00.000Z',
    curiousUserIds: ['sample-user-1', 'sample-user-4', 'sample-user-5'],
  },
  {
    id: 'question-3',
    userId: 'sample-user-3',
    authorLabel: text.anonymous,
    title: '\uc0ac\ub0b4 \uce74\ud398 \uc2e0\uba54\ub274\ub294 \uc5b8\uc81c \ucd94\uac00\ub418\ub098\uc694?',
    body: '',
    createdAt: '2026-08-20T01:05:00.000Z',
    curiousUserIds: ['sample-user-1'],
  },
  {
    id: 'question-4',
    userId: 'sample-user-4',
    authorLabel: text.anonymous,
    title: '\uc7ac\ud0dd\uadfc\ubb34 \uc2e0\uccad \uae30\uac04\uc740 \uc5b8\uc81c\uc778\uac00\uc694?',
    body: '',
    createdAt: '2026-08-20T03:20:00.000Z',
    curiousUserIds: ['sample-user-2', 'sample-user-5'],
  },
]

function getStoredUserId() {
  const storedId = localStorage.getItem(USER_KEY)

  if (storedId) {
    return storedId
  }

  const newUserId = crypto.randomUUID()
  localStorage.setItem(USER_KEY, newUserId)
  return newUserId
}

function getStoredQuestions() {
  const storedVersion = localStorage.getItem(DATA_VERSION_KEY)

  if (storedVersion !== DATA_VERSION) {
    localStorage.setItem(DATA_VERSION_KEY, DATA_VERSION)
    localStorage.setItem(QUESTIONS_KEY, JSON.stringify(initialQuestions))
    return initialQuestions
  }

  const storedQuestions = localStorage.getItem(QUESTIONS_KEY)

  if (!storedQuestions) {
    return initialQuestions
  }

  try {
    const parsedQuestions = JSON.parse(storedQuestions)
    return Array.isArray(parsedQuestions) ? parsedQuestions : initialQuestions
  } catch {
    return initialQuestions
  }
}

function getDateKey(dateValue) {
  const date = new Date(dateValue)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

function getQuestionText(question) {
  return [question.title, question.body, question.content].filter(Boolean).join(' ')
}

function getKeywords(content) {
  return content
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .split(/\s+/)
    .filter((word) => word.length >= 2)
}

function calculateSimilarity(source, target) {
  const sourceKeywords = new Set(getKeywords(source))
  const targetKeywords = new Set(getKeywords(target))

  if (sourceKeywords.size === 0 || targetKeywords.size === 0) {
    return 0
  }

  const matchedCount = [...sourceKeywords].filter((word) =>
    targetKeywords.has(word),
  ).length

  return matchedCount / Math.min(sourceKeywords.size, targetKeywords.size)
}

function resizeTextarea(event) {
  event.currentTarget.style.height = 'auto'
  event.currentTarget.style.height = `${event.currentTarget.scrollHeight}px`
}

function App() {
  const [userId] = useState(getStoredUserId)
  const [questions, setQuestions] = useState(getStoredQuestions)
  const [draftTitle, setDraftTitle] = useState('')
  const [draftBody, setDraftBody] = useState('')
  const [isAnonymous, setIsAnonymous] = useState(true)
  const [sortBy, setSortBy] = useState('curious')
  const [mode, setMode] = useState('list')
  const [notice, setNotice] = useState('')
  const todayKey = getDateKey(new Date())
  const draftText = `${draftTitle} ${draftBody}`.trim()
  const totalCuriousCount = questions.reduce(
    (total, question) => total + question.curiousUserIds.length,
    0,
  )

  const hasAskedToday = useMemo(
    () =>
      questions.some(
        (question) =>
          question.userId === userId &&
          getDateKey(question.createdAt) === todayKey,
      ),
    [questions, todayKey, userId],
  )

  const similarQuestion = useMemo(() => {
    const trimmedDraft = draftText.trim()

    if (trimmedDraft.length < 4) {
      return null
    }

    return (
      questions
        .map((question) => ({
          ...question,
          similarity: calculateSimilarity(trimmedDraft, getQuestionText(question)),
        }))
        .filter((question) => question.similarity >= 0.34)
        .sort((a, b) => b.similarity - a.similarity)[0] ?? null
    )
  }, [draftText, questions])

  const sortedQuestions = useMemo(() => {
    return [...questions].sort((a, b) => {
      if (sortBy === 'latest') {
        return new Date(b.createdAt) - new Date(a.createdAt)
      }

      return (
        b.curiousUserIds.length - a.curiousUserIds.length ||
        new Date(b.createdAt) - new Date(a.createdAt)
      )
    })
  }, [questions, sortBy])

  function persistQuestions(nextQuestions) {
    setQuestions(nextQuestions)
    localStorage.setItem(QUESTIONS_KEY, JSON.stringify(nextQuestions))
  }

  function resetComposer() {
    setDraftTitle('')
    setDraftBody('')
    setIsAnonymous(true)
  }

  function openComposer() {
    if (hasAskedToday) {
      setNotice(text.alreadyAsked)
      return
    }

    setNotice('')
    setMode('write')
  }

  function closeModal() {
    setMode('list')
    setNotice('')
  }

  function showDuplicateCheck() {
    if (hasAskedToday) {
      setNotice(text.alreadyAskedShort)
      setMode('list')
      return
    }

    if (draftTitle.trim().length < 4) {
      setNotice(text.titleRequired)
      return
    }

    setNotice('')
    setMode(similarQuestion ? 'similar' : 'confirm')
  }

  function createQuestion() {
    const title = draftTitle.trim()
    const body = draftBody.trim()

    if (hasAskedToday || title.length < 4) {
      return
    }

    const nextQuestion = {
      id: crypto.randomUUID(),
      userId,
      authorLabel: isAnonymous ? text.anonymous : text.author,
      title,
      body,
      createdAt: new Date().toISOString(),
      curiousUserIds: [],
    }

    persistQuestions([nextQuestion, ...questions])
    resetComposer()
    setMode('list')
    setNotice(text.questionCreated)
  }

  function toggleCurious(questionId) {
    const nextQuestions = questions.map((question) => {
      if (question.id !== questionId) {
        return question
      }

      const isCurious = question.curiousUserIds.includes(userId)
      const curiousUserIds = isCurious
        ? question.curiousUserIds.filter((id) => id !== userId)
        : [...question.curiousUserIds, userId]

      return { ...question, curiousUserIds }
    })

    persistQuestions(nextQuestions)
    setNotice('')
    setMode('list')
  }

  return (
    <main className={mode === 'list' ? 'app' : 'app modal-open'}>
      <header className="app-header">
        <div>
          <p className="product-name">{text.askbox}</p>
          <p className="service-name">{text.brandLabel}</p>
        </div>
        <button type="button" className="primary-button" onClick={openComposer}>
          <span aria-hidden="true">+</span>
          {text.writeQuestion}
        </button>
      </header>

      <section className="status-panel" aria-label={text.todayStatus}>
        <div className="status-item">
          <span>{text.todayStatus}</span>
          <strong>{hasAskedToday ? text.completed : text.available}</strong>
        </div>
        <div className="status-item">
          <span>{text.totalQuestions}</span>
          <strong>{questions.length}</strong>
        </div>
        <div className="status-item">
          <span>{text.totalCurious}</span>
          <strong>{totalCuriousCount}</strong>
        </div>
        <div className="status-item">
          <span>{text.duplicateCheck}</span>
          <strong>ON</strong>
        </div>
      </section>

      {notice && <p className="notice">{notice}</p>}

      <section className="question-section" aria-labelledby="list-title">
        <div className="section-heading">
          <div>
            <p className="section-label">{text.listLabel}</p>
            <h2 id="list-title">{text.listTitle}</h2>
          </div>
          <div className="sort-tabs" aria-label={text.listLabel}>
            <button
              type="button"
              className={sortBy === 'curious' ? 'active' : ''}
              onClick={() => setSortBy('curious')}
            >
              <span className="tab-mark hot" aria-hidden="true"></span>
              {text.curiousSort}
            </button>
            <button
              type="button"
              className={sortBy === 'latest' ? 'active' : ''}
              onClick={() => setSortBy('latest')}
            >
              <span className="tab-mark recent" aria-hidden="true"></span>
              {text.latestSort}
            </button>
          </div>
        </div>

        <div className="question-list">
          {sortedQuestions.map((question) => (
            <QuestionItem
              key={question.id}
              question={question}
              userId={userId}
              onCurious={toggleCurious}
            />
          ))}
        </div>
      </section>

      {mode !== 'list' && (
        <div className="modal-layer" role="presentation">
          <section className="modal-sheet" aria-labelledby="modal-title">
            <button
              type="button"
              className="close-button"
              aria-label={text.close}
              onClick={closeModal}
            >
              x
            </button>

            {mode === 'write' && (
              <>
                <div className="modal-heading">
                  <h2 id="modal-title">{text.modalTitle}</h2>
                  <p>{text.todayPrompt}</p>
                </div>

                <label className="field">
                  <span>{text.questionTitle}</span>
                  <input
                    value={draftTitle}
                    onChange={(event) => setDraftTitle(event.target.value)}
                    maxLength={60}
                    placeholder={text.placeholderTitle}
                  />
                </label>

                <label className="field">
                  <span>{text.body}</span>
                  <textarea
                    value={draftBody}
                    onChange={(event) => setDraftBody(event.target.value)}
                    onInput={resizeTextarea}
                    maxLength={500}
                    placeholder={text.placeholderBody}
                    rows={3}
                  />
                  <small>{text.bodyHint}</small>
                </label>

                <div className="anonymous-row">
                  <div>
                    <span>{text.privacyMode}</span>
                    <strong>{isAnonymous ? text.toggleOn : text.toggleOff}</strong>
                  </div>
                  <button
                    type="button"
                    className={isAnonymous ? 'toggle active' : 'toggle'}
                    aria-pressed={isAnonymous}
                    onClick={() => setIsAnonymous((current) => !current)}
                  >
                    <span></span>
                  </button>
                </div>

                <div className="modal-actions">
                  <span className="counter">{draftTitle.trim().length}/60</span>
                  <button type="button" className="primary-button" onClick={showDuplicateCheck}>
                    {text.next}
                  </button>
                </div>
              </>
            )}

            {mode === 'similar' && similarQuestion && (
              <>
                <div className="modal-heading">
                  <h2 id="modal-title">{text.duplicateTitle}</h2>
                  <p>{text.similarBody}</p>
                </div>
                <div className="similar-preview">
                  <QuestionItem
                    question={similarQuestion}
                    userId={userId}
                    onCurious={toggleCurious}
                    compact
                  />
                  <div className="draft-preview">
                    <span>{text.enteredQuestion}</span>
                    <strong>{draftTitle.trim()}</strong>
                    {draftBody.trim() && <p>{draftBody.trim()}</p>}
                  </div>
                </div>
                <div className="stack-actions">
                  <button
                    type="button"
                    className="primary-button"
                    onClick={() => toggleCurious(similarQuestion.id)}
                  >
                    {text.submitAsCurious}
                  </button>
                  <button type="button" className="soft-button" onClick={createQuestion}>
                    {text.submitAsNew}
                  </button>
                </div>
              </>
            )}

            {mode === 'confirm' && (
              <>
                <div className="modal-heading">
                  <h2 id="modal-title">{text.confirmRegister}</h2>
                  <p>{text.noSimilar}</p>
                </div>
                <div className="new-question-preview">
                  <strong>{draftTitle.trim()}</strong>
                  {draftBody.trim() && <p>{draftBody.trim()}</p>}
                </div>
                <button type="button" className="primary-button" onClick={createQuestion}>
                  {text.register}
                </button>
              </>
            )}
          </section>
        </div>
      )}
    </main>
  )
}

function QuestionItem({ question, userId, onCurious, compact = false }) {
  const isCurious = question.curiousUserIds.includes(userId)
  const title = question.title || question.content || text.untitled
  const body = question.body || ''
  const countLabel = `${question.curiousUserIds.length}${text.curiousSuffix}`

  return (
    <article className={compact ? 'question-item compact' : 'question-item'}>
      <div className="question-main">
        <div className="question-meta">
          <span className="author-pill">{question.authorLabel ?? text.anonymous}</span>
          <span className="curious-count" aria-label={countLabel}>
            <span className="count-mark" aria-hidden="true"></span>
            {question.curiousUserIds.length}{text.curiousSuffix}
          </span>
        </div>
        <h3 className="question-title">{title}</h3>
        {body && <p className="question-body">{body}</p>}
        {!compact && (
          <time dateTime={question.createdAt}>
            {new Intl.DateTimeFormat('ko-KR', {
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            }).format(new Date(question.createdAt))}
          </time>
        )}
      </div>

      {!compact && (
        <button
          type="button"
          className={isCurious ? 'curious-button active' : 'curious-button'}
          onClick={() => onCurious(question.id)}
        >
          {isCurious ? text.undoCurious : text.curious}
        </button>
      )}
    </article>
  )
}

export default App
