Add-Type -AssemblyName PresentationCore
Add-Type -AssemblyName PresentationFramework
Add-Type -AssemblyName WindowsBase
$outFile = 'C:\Users\USER\Repos\portfolio\.previews-08c\full-wpf.png'
$url = 'file:///C:/Users/USER/Repos/portfolio/08C.html'
$window = New-Object System.Windows.Window
$window.Width = 1600
$window.Height = 12000
$window.WindowStyle = 'None'
$window.ResizeMode = 'NoResize'
$window.ShowInTaskbar = $false
$window.Left = -10000
$window.Top = -10000
$browser = New-Object System.Windows.Controls.WebBrowser
$browser.Width = 1600
$browser.Height = 12000
$window.Content = $browser
$browser.add_LoadCompleted({
    Start-Sleep -Milliseconds 3000
    try {
        $doc = $browser.Document
        if ($doc -and $doc.body) { $doc.body.style.background = '#d8d0c1' }
    } catch {}
    Start-Sleep -Milliseconds 1500
    $window.UpdateLayout()
    $rtb = New-Object System.Windows.Media.Imaging.RenderTargetBitmap(1600,12000,96,96,[System.Windows.Media.PixelFormats]::Pbgra32)
    $rtb.Render($window)
    $encoder = New-Object System.Windows.Media.Imaging.PngBitmapEncoder
    $encoder.Frames.Add([System.Windows.Media.Imaging.BitmapFrame]::Create($rtb))
    $fs = [System.IO.File]::Open($outFile,[System.IO.FileMode]::Create)
    $encoder.Save($fs)
    $fs.Close()
    $window.Close()
})
$window.Show()
$browser.Navigate($url)
[System.Windows.Threading.Dispatcher]::Run()
