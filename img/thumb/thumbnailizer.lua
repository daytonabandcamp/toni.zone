-- thumbnailizer 1.1: crop it yourself you lazy bastard

function mysplit(inputstr, sep)
    if sep == nil then
      sep = "%s"
    end
    local t = {}
    for str in string.gmatch(inputstr, "([^"..sep.."]+)") do
      table.insert(t, str)
    end
    return t
end

print("thumbnailizer by daytona\n\ninput: {filename},{text}")
commands = io.read()

-- FILENAME = comList[1]
-- TEXT = comList[2]

comList = mysplit(commands, ',')

os.execute("magick "..comList[1]..".png -resize 512x -gravity Center -crop 512x288+0+0 +repage "..comList[1].."-crop.png")
os.execute("magick "..comList[1].."-crop.png -gravity SouthWest -stroke black -strokewidth 12 -font Ubuntu-Mono -pointsize 108 -annotate +10+0 "..comList[2].." -stroke none -fill white -annotate +12+2 "..comList[2].." "..comList[1].."-thumb.png")
os.execute("del "..comList[1].."-crop.png")
