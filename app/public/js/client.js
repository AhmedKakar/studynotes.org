# Logging functions for convenience
window.log = ->
  args = Array.prototype.slice.call(arguments, 0)
  console.log.apply(console, args)

window.error = ->
  args = Array.prototype.slice.call(arguments, 0)
  args.unshift('ERROR:')
  console.error.apply(console, args)

# Set search bar's width so it fills the header correctly.
# Need to ensure this gets called after Typekit fonts are loaded.
$headerLeft = $('.header .left')
$headerRight = $('.header .right')
$headerSearch = $('.header .search')
updateHeaderSearchWidth = ->
  headerLeftWidth = $headerLeft.width()
  headerRightWidth = $headerRight.width()
  $headerSearch
    .css({
      'margin-left': headerLeftWidth,
      'margin-right': headerRightWidth
    })
    .removeClass('off')

  # Continue to set the width every 100ms until fonts are done loading.
  # If fonts don't load, then wf-loading gets removed automatically
  # after 1000ms, so this won't run forever. 
  if $('html').hasClass('wf-loading')
    setTimeout(updateHeaderSearchWidth, 100)

toggleBrowseMenu = (_switch) ->
  $('.browse').toggleClass('on', _switch)
  $('.header .courses').toggleClass('on', _switch)

$(->

  # Browse menu dropdown
  $('.header .courses').on('click', (e) ->
    # Only handle left-clicks
    if ( event.which != 1 )
      return

    e.preventDefault()
    toggleBrowseMenu()
  )

  # Close browse menu on search focus
  $headerSearch.on('focusin', (e) ->
    toggleBrowseMenu(false)
  )

  $html = $('html')
  $hero = $('.hero')
  $header = $('.header')
  heroBottom = $hero.offset().top + $hero.height() - $header.height()
  $window = $(window)

  # Close browse menu on page scroll
  $(window).on('scroll', $.throttle(50, () ->
    toggleBrowseMenu(false)

    # Toggle header text color
    windowScrollTop = $window.scrollTop()
    className = 'solidHeader'
    if $html.hasClass(className) && windowScrollTop < heroBottom
      $html.removeClass(className)
    else if !$html.hasClass(className) && windowScrollTop >= heroBottom
      $html.addClass('solidHeader')
  ))

  updateHeaderSearchWidth()
)

$(window).load(->

)
