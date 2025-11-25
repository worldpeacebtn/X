// src/App.jsx
import React, { useEffect, useState } from 'react'
import { supabase } from './supabaseClient'
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useParams } from 'react-router-dom'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei'
import { Suspense } from 'react'

// small helpers
function formatSize(size){ if(size<1024) return `${size} B`; if(size<1024*1024) return `${(size/1024).toFixed(1)} KB`; return `${(size/1024/1024).toFixed(2)} MB` }

function HoloBackground(){
  return (
    <Canvas className="absolute inset-0 w-full h-full -z-10" camera={{ position: [0,0,8] }}>
      <ambientLight intensity={0.4} />
      <directionalLight intensity={0.5} position={[5,5,5]} />
      <Suspense fallback={null}>
        <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade />
        <OrbitControls enableZoom={false} enablePan={false} />
      </Suspense>
    </Canvas>
  )
}

function AuthWidget({onAuth}) {
  const [user, setUser] = useState(null)
  useEffect(()=> {
    const u = supabase.auth.user()
    setUser(u)
    const { data:sub } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null); onAuth?.(session?.user ?? null)
    })
    return ()=> sub?.unsubscribe?.()
  },[])
  async function signIn() {
    // Social (GitHub) or magic link
    await supabase.auth.signIn({ provider: 'github' })
  }
  async function signOut(){
    await supabase.auth.signOut()
    setUser(null)
    onAuth?.(null)
  }
  if(!user) {
    return <button onClick={signIn} className="px-4 py-2 rounded bg-gradient-to-r from-purple-500 to-blue-500 text-white">Sign in with GitHub</button>
  }
  return (
    <div className="flex items-center gap-3">
      <div className="text-sm">Hi, <strong>{user.email ?? user.user_metadata?.full_name ?? user.id}</strong></div>
      <button onClick={signOut} className="px-3 py-1 rounded bg-gray-800/60">Sign out</button>
    </div>
  )
}

function UploadBox({user, onUploaded}) {
  const [file, setFile] = useState(null)
  const [tag, setTag] = useState('')
  const [desc, setDesc] = useState('')
  const [loading, setLoading] = useState(false)
  async function upload(){
    if(!file) return alert('choose a file')
    setLoading(true)
    const filePath = `${user.id}/${Date.now()}_${file.name}`
    // upload to supabase storage
    const { data, error } = await supabase.storage.from('uploads').upload(filePath, file)
    if(error){ alert(error.message); setLoading(false); return }
    // create metadata row
    const publicUrl = supabase.storage.from('uploads').getPublicUrl(data.path).publicURL
    const { error: e2 } = await supabase.from('files').insert([{
      user_id: user.id,
      path: data.path,
      name: file.name,
      size: file.size,
      mime: file.type,
      description: desc,
      tag
    }])
    setLoading(false)
    setFile(null)
    setDesc('')
    setTag('')
    onUploaded?.()
    alert('uploaded — shareable link ready in your files list')
  }
  return (
    <div className="p-4 rounded-xl bg-white/5 border border-cyan-500/20">
      <div className="mb-2 text-sm text-gray-300">Upload file (images, pdf, txt, mp4 etc)</div>
      <input type="file" onChange={(e)=>setFile(e.target.files?.[0] ?? null)} />
      <div className="mt-2 flex gap-2">
        <input value={tag} onChange={e=>setTag(e.target.value)} placeholder="tag (ex: evidence)" className="p-2 rounded bg-white/3 flex-1" />
        <button onClick={upload} disabled={!user || loading} className="px-3 py-1 rounded bg-gradient-to-r from-pink-500 to-indigo-500 text-white">{loading ? 'Uploading...' : 'Upload'}</button>
      </div>
    </div>
  )
}

function FileList({user}){
  const [files, setFiles] = useState([])
  async function fetchFiles(){
    const { data, error } = await supabase.from('files').select('*').order('created_at',{ascending:false}).limit(100)
    if(error) return console.error(error)
    setFiles(data)
  }
  useEffect(()=>{ fetchFiles() },[])
  return (
    <div className="space-y-4">
      {files.map(f=> <FileItem key={f.id} file={f} />)}
    </div>
  )
}

function getPreviewUrl(path){
  // public url (if bucket public) or signed url
  // we'll try to get a signed url
  return supabase.storage.from('uploads').createSignedUrl(path, 60*60).then(r=> r.data.signedURL).catch(()=>null)
}

function FileItem({file}){
  const [url, setUrl] = useState(null)
  const [loading, setLoading] = useState(true)
  useEffect(()=>{
    let mounted=true
    supabase.storage.from('uploads').createSignedUrl(file.path, 60*60).then(res=>{
      if(mounted && res?.data?.signedURL) setUrl(res.data.signedURL)
    }).finally(()=> mounted && setLoading(false))
    return ()=> mounted=false
  },[file])
  const isImage = file.mime?.startsWith('image/')
  const isPdf = file.mime === 'application/pdf'
  const isVideo = file.mime?.startsWith('video/')
  const isText = file.mime?.startsWith('text/')
  return (
    <div className="p-4 bg-white/3 rounded border border-white/6">
      <div className="flex justify-between">
        <div>
          <div className="font-semibold">{file.name}</div>
          <div className="text-xs text-gray-300">{file.tag} • {formatSize(file.size)}</div>
        </div>
        <div className="text-xs text-gray-400">{new Date(file.created_at).toLocaleString()}</div>
      </div>

      <div className="mt-3">
        {loading && <div className="text-xs text-gray-400">loading preview…</div>}
        {!loading && url && (
          <>
            {isImage && <img src={url} alt={file.name} className="max-h-72 rounded" />}
            {isPdf && <iframe src={url} className="w-full h-96 rounded border" title={file.name}></iframe>}
            {isVideo && <video src={url} controls className="w-full max-h-96 rounded"></video>}
            {isText && <iframe src={url} className="w-full h-72 rounded" title={file.name}></iframe>}
            {!isImage && !isPdf && !isVideo && !isText && <a className="text-sm text-cyan-300" href={url} target="_blank">Open file</a>}
          </>
        )}
      </div>

      <div className="mt-3 flex gap-2">
        <a className="text-xs px-2 py-1 bg-white/5 rounded" href={`/f/${file.id}`}>Share link</a>
      </div>
    </div>
  )
}

function FilesPage({user}){
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-bold">Files & Uploads</h2>
      <UploadBox user={user} onUploaded={()=>window.location.reload()} />
      <FileList user={user} />
    </div>
  )
}

function Home({user, setUser}) {
  return (
    <div className="min-h-screen">
      <HoloBackground />
      <div className="relative z-10 p-8 max-w-4xl mx-auto">
        <header className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">X42 — Witness Briefing</h1>
            <div className="text-sm text-gray-300">Secure uploads & sharing — MVP</div>
          </div>
          <AuthWidget onAuth={setUser} />
        </header>

        <main className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="col-span-2">
              <p className="text-gray-300">Upload files, preview them, create share links and tag them. Files are stored in Supabase storage and metadata in DB.</p>
              <div className="mt-6">
                <Link to="/files" className="px-4 py-2 rounded bg-gradient-to-r from-cyan-500 to-indigo-500 text-white">Go to files</Link>
              </div>
            </div>
            <div>
              <div className="p-4 rounded bg-white/3">
                <div className="text-xs text-gray-300">Quick tips</div>
                <ul className="mt-2 text-sm text-gray-200">
                  <li>- Files are private by default (signed URLs)</li>
                  <li>- Use tags to group uploads</li>
                  <li>- GitHub sign-in recommended</li>
                </ul>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

function FileShareView(){
  const { id } = useParams()
  const [file, setFile] = useState(null)
  useEffect(()=>{
    supabase.from('files').select('*').eq('id', id).single().then(r=> setFile(r.data))
  },[id])
  if(!file) return <div className="p-8 text-gray-300">Loading…</div>
  return <div className="p-8">
    <h2 className="text-xl font-bold">{file.name}</h2>
    <div className="text-sm text-gray-400">{file.description}</div>
    <div className="mt-4">
      <iframe src={supabase.storage.from('uploads').createSignedUrl(file.path, 60*60).then(r=> r.data.signedURL)} />
    </div>
  </div>
}

export default function App(){
  const [user, setUser] = useState(null)
  useEffect(()=> {
    setUser(supabase.auth.user())
  },[])
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home user={user} setUser={setUser} />} />
        <Route path="/files" element={<FilesPage user={user} />} />
        <Route path="/f/:id" element={<FileShareView />} />
      </Routes>
    </Router>
  )
}
