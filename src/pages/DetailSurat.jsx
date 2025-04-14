import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Mengimpor useNavigate
import parse from "html-react-parser";
<<<<<<< HEAD
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPlayCircle, faPauseCircle, faFastBackward, faFastForward } from '@fortawesome/free-solid-svg-icons';
=======
import AudioPlayer from "../components/AudioPlayer";
>>>>>>> 271d68acb7fcf9a9455ecf9aa56990dda12ba152

const DetailSurat = () => {
  const { id } = useParams(); // Ambil parameter dari URL
  const navigate = useNavigate(); // Mendapatkan fungsi navigasi
  const [surat, setSurat] = useState([]);
  const [loading, setLoading] = useState(true);
<<<<<<< HEAD
  const [audio, setAudio] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false); // State untuk melacak status audio
  const audioRef = useRef(null); // Menggunakan useRef untuk menyimpan instance Audio

  const play = (url) => {
    if (audioRef.current) {
      audioRef.current.pause(); // Hentikan audio yang sedang diputar
    }
    const newAudio = new Audio(url);
    newAudio.play(); // Putar audio baru
    setAudio(newAudio); // Simpan audio baru ke state
    audioRef.current = newAudio; // Simpan referensi audio
    setIsPlaying(true); // Set status audio ke playing

    // Tambahkan event listener untuk mengubah status saat audio selesai
    newAudio.onended = () => {
      setIsPlaying(false); // Set status audio ke paused saat audio selesai
    };
  };

  const togglePlay = (url) => {
    if (isPlaying) {
      audioRef.current.pause(); // Menjeda audio
      setIsPlaying(false); // Set status audio ke paused
    } else {
      play(url); // Putar audio baru
    }
  };
=======
  const [currentAudio, setCurrentAudio] = useState(null);
>>>>>>> 271d68acb7fcf9a9455ecf9aa56990dda12ba152

  const getDetailSurat = (idSurat) => {
    fetch(`https://equran.id/api/v2/surat/${idSurat}`)
      .then((res) => res.json())
      .then((data) => {
        setSurat(data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    getDetailSurat(id);
  }, [id]); // Jalankan useEffect setiap `id` berubah

  if (loading) return <p>Loading...</p>;
  if (!surat) return <p>Surat tidak ditemukan.</p>;

  return (
    <>
      <div className="vh-100 overflow-auto">
        <h2>
          {surat.namaLatin} ({surat.nama})
        </h2>
        <p>Jumlah Ayat: {surat.jumlahAyat}</p>
        <p>Arti: {surat.arti}</p>
        <p>Deskripsi: {parse(surat.deskripsi)}</p>
        <p>Tempat Turun: {surat.tempatTurun}</p>

        <div className="mt-4">
          <h5>Audio Murotal:</h5>
          <button className="btn btn-outline-danger" style={{backgroundColor:'#841584', color:'white'}} onClick={() => play("https://equran.nos.wjv-1.neo.id/audio-full/Abdullah-Al-Juhany/001.mp3")}>
            <FontAwesomeIcon icon={faPlay} className={`animate ${isPlaying ? 'playing' : ''}`} style={{ marginRight: '8px' }}/>  
             Putar Murotal
          </button>
        </div><br></br>

        <div>
          <ul className="list-group">
            {surat.ayat.map((ayat) => (
<<<<<<< HEAD
              <li
                className="list-group-item d-flex justify-content-between align-items-center arabic-text"
                key={ayat.nomorAyat }>
                <div className="ayat-text text-end">
                  <p style={{ fontSize: '14px' }}>
                    ({ayat.nomorAyat}) {ayat.teksArab}<br></br>
                    {ayat.teksLatin}<br></br><br></br>
                    ({ayat.teksIndonesia})
                  </p>
                </div>
                <span className="badge rounded-pill" style={{backgroundColor: '#841584', color: 'white'}}>
                  <button className="btn btn-white" style={{ backgroundColor: 'transparent', border:'none', color: 'white'}} onClick={() => togglePlay(ayat.audio["05"])}>
                    <FontAwesomeIcon icon={isPlaying ? faPauseCircle : faPlayCircle} className={`fs-4 ${isPlaying ? 'animate' : ''}`} />
                  </button>
                </span>
=======
              <li key={ayat.nomorAyat}>
                <div className="list-group-item d-flex justify-content-between">
                  <span className=" align-items-center arabic-text">
                    {ayat.teksArab}
                  </span>
                  <div className=" d-flex align-items-center">
                    <span className="badge text-bg-primary rounded-sm d-flex align-items-center p-2 me-1">
                      {ayat.nomorAyat}
                    </span>
                    <span>
                      <AudioPlayer
                        key={ayat.nomorAyat}
                        url={ayat.audio["05"]}
                        currentAudio={currentAudio}
                        setCurrentAudio={setCurrentAudio}
                      ></AudioPlayer>
                    </span>
                  </div>
                </div>
>>>>>>> 271d68acb7fcf9a9455ecf9aa56990dda12ba152
              </li>
            ))}
          </ul>
        </div>
      </div><br></br>
      <div className="d-flex justify-content-between">
        <button className="btn btn-outline-danger" style={{backgroundColor:'#841584', color:'white'}} onClick={() => navigate(-1)}>
          <FontAwesomeIcon icon={faFastBackward} style={{ marginRight: '8px' }}/>  
          Surat Sebelumnya
        </button>
        <button className="btn btn-outline-danger" style={{backgroundColor:'#841584', color:'white'}} onClick={() => navigate(`/surat/${parseInt(id) + 1}`)}>
          Surat Selanjutnya
          <FontAwesomeIcon icon={faFastForward} style={{ marginLeft: '8px', justifyContent: 'flex-start'}}/>  
        </button>
      </div>
    </>
  );
};

export default DetailSurat;
