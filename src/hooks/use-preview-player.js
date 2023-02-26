const usePreviewPlayer = (
  song,
  timerIds,
  setTimerIds,
  setPlay,
  setPreview,
  setPreviewName,
  setPreviewLink
) => {
  const playPreviewSong = (playPreview, stop = false) => {
    if (stop) {
      clearTimeout(timerIds);
      setPlayerValues();
      window.Amplitude.stop();
      return;
    }
    setPlayerValues(playPreview, song);
    setTimerIds(
      setTimeout(() => {
        setPlayerValues();
      }, 30500)
    );
    window.Amplitude.playNow({
      url: `${song.previewUrl}`,
    });
  };

  const setPlayerValues = (play = false, value = null) => {
    setPlay(play);
    setPreview(value?.previewUrl);
    setPreviewName(value?.trackName);
    setPreviewLink(value?.trackViewUrl);
  };
  return { playPreviewSong };
};
export default usePreviewPlayer;
