#!/bin/bash

# Replace these variables with your specific information
BASE_URL="http://kawayiboy.github.io"
SITEMAP_PATH="./sitemap.xml"
SITEMAP_FOLDER="./"
SITE_FILES_REGEX=$(find . -name '*.html')
SITEMAP_HTML_PATH="./sitemap.html"

# Function to generate the sitemap
generate_sitemap() {
    cd "$SITEMAP_FOLDER" || exit
    echo "<?xml version=\"1.0\" encoding=\"UTF-8\"?>" > "$SITEMAP_PATH"
    echo "<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">" >> "$SITEMAP_PATH"

    for file in $SITE_FILES_REGEX; do
        filename=${file:2}
        echo "$filename"
        if [ "$filename" != "sitemap.html" ] && [ -f "$filename" ]; then
            echo "  <url>" >> "$SITEMAP_PATH"
            echo "    <loc>$BASE_URL/$filename</loc>" >> "$SITEMAP_PATH"
            echo "  </url>" >> "$SITEMAP_PATH"
        fi
    done

    echo "</urlset>" >> "$SITEMAP_PATH"
}


generate_sitemap_html() {
    cd "$SITEMAP_FOLDER" || exit
    echo "<html><head></head><body><ul>" > "$SITEMAP_HTML_PATH"

    for file in $SITE_FILES_REGEX; do
        filename=${file:2}
        if [ "$filename" != "sitemap.html" ] && [ -f "$filename" ]; then
            echo "<li><a href='$BASE_URL/$filename'>$filename</a></li>" >> "$SITEMAP_HTML_PATH"
        fi
    done

    echo "</ul></body></html>" >> "$SITEMAP_HTML_PATH"
}


# Check if the sitemap already exists
if [ -f "$SITEMAP_PATH" ]; then
    echo "Sitemap already exists. Updating..."
else
    echo "Sitemap does not exist. Creating..."
fi

# Update the sitemap
generate_sitemap
generate_sitemap_html

echo "Sitemap updated successfully."