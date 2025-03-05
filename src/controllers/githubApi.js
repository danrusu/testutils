const TARGET_REPOSITORY = 'anonymous-feedback';
const GITHUB_API_TOKEN = process.env.GITHUB_API_TOKEN; // this sould be a secret
const authorization = {
  Authorization: `Bearer ${GITHUB_API_TOKEN}`,
};

module.exports = { submitFeedback };

async function submitFeedback({ feedback, commitMessage = 'feedback' }) {
  const fileDetails = {
    owner: 'danrusu',
    repository: TARGET_REPOSITORY,
    filePath: 'js-for-testers.md',
  };
  return appendToFile({
    ...fileDetails,
    content: feedback,
    commitMessage,
  });
}

async function fetchFile({ owner, repository, filePath }) {
  const url = githubUrl({ owner, repository, filePath });
  const response = await fetch(url, {
    headers: {
      ...authorization,
    },
  });
  console.log(response.status);
  const { content: encodedContent, encoding, sha } = await response.json();
  const content = Buffer.from(encodedContent, encoding).toString('utf8');
  return { content, sha };
}

async function updateFile({
  owner,
  repository,
  filePath,
  newContent,
  sha,
  commitMessage,
}) {
  const response = await fetch(githubUrl({ owner, repository, filePath }), {
    method: 'PUT',
    headers: {
      ...authorization,
      'content-type': 'application/vnd.github+json',
    },
    body: JSON.stringify({
      message: commitMessage,
      content: Buffer.from(newContent).toString('base64'),
      sha,
    }),
  });
  return response.json();
}

async function appendToFile({
  owner,
  repository,
  filePath,
  content,
  commitMessage,
}) {
  const { content: actualContent, sha } = await fetchFile({
    owner,
    repository,
    filePath,
  });
  const newContent = `${actualContent}\n***\n${content}`;
  return updateFile({
    owner,
    repository,
    filePath,
    newContent,
    sha,
    commitMessage,
  });
}

function githubUrl({ owner, repository, filePath }) {
  return `https://api.github.com/repos/${owner}/${repository}/contents/${filePath}`;
}
