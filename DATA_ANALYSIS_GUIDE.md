# Empirica Data Analysis Guide

## Overview

This guide provides instructions for extracting and processing data from Empirica experiments into a rectangular dataframe suitable for analysis in R.

### Study Structure
- **4 players per game** - all share the same `gameID`
- **Each player** has a unique `participantIdentifier` (Prolific ID)
- **All players in one game** share game-level data (e.g., chat messages, task description)

---

## 📁 Exported CSV Files

You'll receive a folder with these CSV files:

- `batch.csv` - Batch-level data
- `game.csv` - Game-level data (shared by all 4 players)
- `player.csv` - Player-level data (individual responses)
- `playerGame.csv` - Player-game junction
- `playerRound.csv` - Player-round junction
- `playerStage.csv` - Player-stage junction
- `round.csv` - Round-level data
- `stage.csv` - Stage-level data
- `global.csv` - Global settings

---

## 🎯 R Script: Building the Rectangular Dataframe

### Step 1: Load All CSVs

```r
library(tidyverse)

# Set working directory to your downloaded results folder
setwd("path/to/downloaded_result_YYYYMMDD_HHMMSS/")

# Load all CSVs
batch <- read_csv("batch.csv")
game <- read_csv("game.csv")
player <- read_csv("player.csv")
playerGame <- read_csv("playerGame.csv")
playerRound <- read_csv("playerRound.csv")
playerStage <- read_csv("playerStage.csv")
round <- read_csv("round.csv")
stage <- read_csv("stage.csv")
```

### Step 2: Create Main Dataframe

The primary unit of analysis is typically **one row per player**. Start with `player.csv` and join game and batch data:

```r
# Build rectangular dataframe (one row per player)
df <- player %>%
  # Join game-level data
  left_join(
    game,
    by = c("gameID" = "id"),
    suffix = c("", "_game")
  ) %>%
  # Join batch-level data
  left_join(
    batch,
    by = c("batchID" = "id"),
    suffix = c("", "_batch")
  )

# Optional: Remove timestamp columns
df <- df %>% select(-ends_with("LastChangedAt"))

# Optional: Filter out waiting room games (if present)
df <- df %>% filter(isWaiting != TRUE | is.na(isWaiting))
```

### Step 3: Handle Complex Variables

Many variables are stored as JSON strings. Keep them as-is initially, then parse when needed:

```r
library(jsonlite)

# Example: Parse introSurvey JSON
df <- df %>%
  mutate(
    introSurvey_parsed = lapply(introSurvey, fromJSON),
    exitSurvey_parsed = lapply(exitSurvey, fromJSON)
  )

# Example: Extract specific survey components
df <- df %>%
  mutate(
    prestige = sapply(introSurvey_parsed, function(x) x$prestige),
    age = sapply(exitSurvey_parsed, function(x) x$age),
    exit_gender = sapply(exitSurvey_parsed, function(x) x$gender)
  )
```

---

## 📊 Variable Reference Guide

### Core Identifiers

| Variable | CSV | Description |
|----------|-----|-------------|
| `id` | player.csv | Unique player ID (Empirica-generated) |
| `participantIdentifier` | player.csv | Prolific ID |
| `playerNumber` | player.csv | Consultant number (1-4) |
| `gameID` | player.csv | Game this player belongs to |
| `batchID` | game.csv | Batch identifier |

### Player Demographics & Assignments (PLAYER CSV)

| Variable | Type | Description |
|----------|------|-------------|
| `gender` | string | Gender selection from intro (M/F/O) |
| `playerNumber` | number | Consultant number (1-4) |
| `role` | string | Role assignment ("A" or "B") |
| `playerType` | string | Player type ("A" or "B") |
    A= broker, B = bystander
    same as role i guess, sometimes things get duplicated
| `fileColor` | string | File color assignment ("red", "blue", "green") |
| `condition` | string | Experimental condition ("H", "L", or "C") |
| `clues` | JSON array | Array of clue IDs assigned [1-18] |
  corresponds to file
| `chatPeers` | JSON array | Array of player IDs they can chat with |
  

### Discussion Stage Data (PLAYER CSV)

**Information Table Responses:**
| Variable Pattern | Type | Description |
|-----------------|------|-------------|
| `clueResponse_1` to `clueResponse_18` | string | Text responses for each clue question |
| `clueSource_1` to `clueSource_18` | string | "Who did you hear this from" (consultant number or "unsure") |

**Chat Tracking:**
| Variable | Type | Description |
|----------|------|-------------|
| `chatReadTimestamps` | JSON object | Tracks when each dyadic chat was last read (for unread badges) |

### Prep Stage Surveys (PLAYER CSV)

| Variable | Type | Description |
|----------|------|-------------|
| `introSurvey` | JSON object | Contains all prep stage survey responses |
| `introSurvey.belongingness` | object | 12 belonging questions (keys: 0-11, values: 1-6) |
| `introSurvey.stereotypeThreat` | object | 3 stereotype threat questions (keys: 0-2, values: 1-7) |
| `introSurvey.prestige` | number | 1 task prestige question (value: 1-7) |

### Exit Stage Surveys (PLAYER CSV)

| Variable | Type | Description |
|----------|------|-------------|
| `brokerageSelf` | JSON object | Self-assessment: `{goBetween: "1"-"7", gatekeeper: "1"-"7"}` |
| `brokeragePeer` | JSON object | Peer assessment: `{consultant<N>_goBetween: "1"-"7", consultant<N>_gatekeeper: "1"-"7"}` |
| `recommendation` | string | Final consulting recommendation (long text) |
| `exitSurvey` | JSON object | Exit demographics |
| `exitSurvey.age` | string | Age |
| `exitSurvey.gender` | string | Gender (Male/Female/Non-Binary) |
| `exitSurvey.race` | string | Race category |
| `exitSurvey.education` | string | Education level (high-school/bachelor/master/other) |

### Game-Level Data (GAME CSV)

| Variable | Type | Description |
|----------|------|-------------|
| `taskDescription` | string | HTML formatted task instructions |
| `chat_<playerID1>_<playerID2>` | JSON array | Chat message history for each dyad (6 dyads per game) |
| `roleAGender` | string | Which gender was assigned to Role A (M/F/O) |
| `isWaiting` | boolean | Whether this is a waiting room game |
| `name` | string | Game name |

**Chat Message Structure** (within each `chat_*` array):
```json
[
  {
    "id": "unique_message_id",
    "senderId": "player_id",
    "senderName": "Consultant X",
    "text": "message content",
    "timestamp": 1234567890
  }
]
```

---

## 🔑 Common Analysis Tasks

### Extract Survey Scales

```r
# Extract belongingness scale (12 items, 1-6 scale)
belongingness_items <- paste0("belongingness_", 0:11)
df <- df %>%
  mutate(
    belongingness_parsed = lapply(introSurvey, fromJSON)
  )

# Create separate columns for each item
for (i in 0:11) {
  df[[paste0("belongingness_", i)]] <- sapply(
    df$belongingness_parsed,
    function(x) x$belongingness[[as.character(i)]]
  )
}

# Calculate mean belongingness score
df <- df %>%
  mutate(
    belongingness_mean = rowMeans(
      select(., starts_with("belongingness_")),
      na.rm = TRUE
    )
  )
```

### Analyze Clue Responses

```r
# Count how many clues each player filled out
clue_response_cols <- paste0("clueResponse_", 1:18)
df <- df %>%
  mutate(
    n_clues_completed = rowSums(!is.na(select(., all_of(clue_response_cols))))
  )

# Count source attributions
clue_source_cols <- paste0("clueSource_", 1:18)
df <- df %>%
  mutate(
    n_sources_attributed = rowSums(!is.na(select(., all_of(clue_source_cols))))
  )
```

### Parse Chat Data

Chat data is stored at the game level. To analyze chat, you may want to create a separate dataframe:

```r
# Extract chat columns from game data
chat_cols <- game %>% select(id, starts_with("chat_"))

# Example: Count total messages per game
game <- game %>%
  mutate(
    total_messages = rowSums(sapply(select(., starts_with("chat_")), function(x) {
      lengths(lapply(x, fromJSON))
    }))
  )
```

---

## 💡 Pro Tips

1. **Keep JSON columns initially**: Don't parse all complex variables at once. Parse only what you need for your specific analysis.

2. **Filter strategically**: Remove waiting room games and incomplete sessions early:
   ```r
   df <- df %>%
     filter(
       isWaiting != TRUE | is.na(isWaiting),
       !is.na(recommendation)  # Has completed the study
     )
   ```

3. **Check data quality**: Look for missing data patterns:
   ```r
   # Summary of completion
   df %>%
     summarise(
       n_players = n(),
       n_with_recommendation = sum(!is.na(recommendation)),
       n_with_exit_survey = sum(!is.na(exitSurvey))
     )
   ```

4. **Handle timestamps**: Each variable has a `*LastChangedAt` column you can use for timing analysis or drop to simplify:
   ```r
   df_clean <- df %>% select(-ends_with("LastChangedAt"))
   ```

5. **Long format for repeated measures**: For clue responses, you may want long format:
   ```r
   df_long <- df %>%
     pivot_longer(
       cols = starts_with("clueResponse_"),
       names_to = "clue_id",
       values_to = "clue_response",
       names_prefix = "clueResponse_"
     ) %>%
     filter(!is.na(clue_response))
   ```

---

## 🐛 Troubleshooting

### Issue: Cannot parse JSON column
**Solution**: Some JSON columns might be `NULL` or empty strings. Handle them:
```r
safe_parse <- function(x) {
  if (is.na(x) || x == "" || is.null(x)) return(NULL)
  tryCatch(fromJSON(x), error = function(e) NULL)
}

df$parsed <- lapply(df$json_column, safe_parse)
```

### Issue: Duplicate column names after join
**Solution**: Use `suffix` parameter in join:
```r
left_join(df1, df2, by = "key", suffix = c("_player", "_game"))
```

### Issue: Need to merge chat data with player data
**Solution**: Chat is at game level, so merge by gameID and filter:
```r
# For a specific dyad between players A and B
player_A_id <- df$id[1]
player_B_id <- df$id[2]
chat_key <- paste0("chat_", sort(c(player_A_id, player_B_id))[1], "_",
                   sort(c(player_A_id, player_B_id))[2])
```

---

## 📧 Questions?

If you encounter issues or need clarification about specific variables, refer back to the application code or contact the study PI.
