#!/bin/bash

# Prompt for project details
echo "Enter the project title:"
read title
echo "Enter the project date (e.g., April 2024):"
read date
echo "Enter the project timeframe (e.g., 1 month):"
read timeframe
echo "Enter the readtime (e.g., 5 minute read):"
read readtime
echo "Enter the image file name (e.g., scene.png):"
read image
echo "Enter the project description:"
read desc
echo "Pin this project? (true/false):"
read pinned
echo "Enter the GitHub link (leave blank if no GitHub link):"
read gh_link

# Format the project folder and filenames based on title
folder_name=$(echo "$title" | tr '[:upper:]' '[:lower:]' | tr -s ' ' | tr ' ' '_')
md_file="${folder_name}.md"
html_file="${folder_name}.html"
image_path="../projects/${folder_name}/assets/${image}"

# Create the project directory and Markdown file
mkdir -p "projects/${folder_name}/assets"
touch "projects/${folder_name}/${md_file}"

# Determine the project link
if [ -n "$gh_link" ]; then
    project_href="$gh_link"
else
    project_href="../projects/${folder_name}/${html_file}"

    echo "# ${title}" > "projects/${folder_name}/${md_file}"
    echo "Created project folder and Markdown file in projects/${folder_name}/."
fi

# Prepend the new entry to projects.json
jq --arg title "$title" \
   --arg date "$date" \
   --arg timeframe "$timeframe" \
   --arg readtime "$readtime" \
   --arg image "$image_path" \
   --arg link "$project_href" \
   --arg desc "$desc" \
   --arg pinned "$pinned" \
   '.projects = ( [{"title": $title, "date": $date, "timeframe": $timeframe, "readtime": $readtime, "image": $image, "link": $link, "desc": $desc, "pinned": ($pinned == "true")} ] + .projects)' \
   projects.json > tmp.$$.json && mv tmp.$$.json projects.json
echo "Added entry to projects.json."

# Clean up temporary file
rm -f tmp.*.json
echo "Temporary file(s) removed."

echo "-------------"
echo "If this wasn't a GH project, make sure to update the README.md, and edit the following HTML to add the header and footer."