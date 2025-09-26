// Sample playlist data is no longer needed since we are using an API.
// Remove the 'const playlists = [...];' array.

// Function to display playlists (now search results from iTunes)
let currentAudio = null;

function displayPlaylists(filterText = "") {
  $("#playlistContainer").empty();

  if (filterText.length < 3) {
    $("#playlistContainer").html("<p class='text-center'>Start typing to search for music...</p>");
    return;
  }

  const searchUrl = `https://itunes.apple.com/search?term=${encodeURIComponent(filterText)}&entity=song,allArtist&limit=25`;

  $.ajax({
    url: searchUrl,
    dataType: "jsonp", // Use JSONP for cross-domain requests
    success: function(data) {
      if (data.results && data.results.length > 0) {
        data.results.forEach(item => {
          const isSong = item.kind === "song";
          const title = isSong ? item.trackName : item.artistName;
          const artist = isSong ? item.artistName : "Artist";
          const cover = item.artworkUrl100 ? item.artworkUrl100.replace('100x100', '400x400') : "https://via.placeholder.com/400";
          const audioPreview = item.previewUrl;
          const type = isSong ? "Song" : "Artist";

          const card = `
            <div class="col-md-4 mb-4">
              <div class="card playlist-card" data-preview-url="${audioPreview}">
                <img src="${cover}" class="card-img-top playlist-cover" alt="cover">
                <div class="card-body">
                  <h5 class="card-title">${title}</h5>
                  <p class="card-text">Artist: ${artist}</p>
                  <span class="badge bg-secondary">${type}</span>
                </div>
              </div>
            </div>
          `;
          $("#playlistContainer").append(card);
        });
      } else {
        $("#playlistContainer").html("<p class='text-center'>No results found.</p>");
      }
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.error('Error fetching data:', textStatus, errorThrown);
      $("#playlistContainer").html("<p class='text-center text-danger'>Error loading music. Please try again.</p>");
    }
  });
}

// Show details of a playlist - this function is no longer used.
// Remove the 'showPlaylistDetails(id)' function.

$(document).ready(function() {
  // Initial call to show a message
  displayPlaylists();

  // Search
  $("#searchInput").on("keyup", function() {
    const value = $(this).val().toLowerCase();
    displayPlaylists(value);
  });

  // Filter by Genre - this is no longer used.
  // Remove the '$("#filterGenre").on("change", function() { ... });' block.

  // Click playlist card to play audio
  $(document).on("click", ".playlist-card", function() {
    // Stop the previous audio if it's playing
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }

    const previewUrl = $(this).data("preview-url");
    if (previewUrl && previewUrl !== "null") {
      currentAudio = new Audio(previewUrl);
      currentAudio.play();
    } else {
      alert("No audio preview available for this item.");
    }
  });

  // Back button - this is no longer used.
  // Remove the '$("#backBtn").click(function() { ... });' block.
});