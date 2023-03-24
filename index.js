/**
 * This is the main entrypoint to your Probot app
 * @param {import('probot').Probot} app
 */
module.exports = (app) => {
  // Your code here
  app.log.info("Yay, the app was loaded!");

  app.on("issues.opened", async (context) => {
    const issueComment = context.issue({
      body: "Thanks for opening this issue!",
    });
    return context.octokit.issues.createComment(issueComment);
  });
 app.onAny(async (context) => {
    app.log.info({ event: context.name, action: context.payload.action });
  });
    

  if (context.event === "push" && context.payload.ref === "refs/heads/main") {
    
    const inputs = {
      param1: "value1",
      param2: "value2",
    };

   
    const res = await context.octokit.request("POST /repos/SiyaaJhawar/workflow/actions/workflows/{workflow_id}/dispatches", {
      owner: context.payload.repository.owner.login,
      repo: context.payload.repository.name,
      workflow_id: "your-workflow-id",
      ref: "main",
      inputs,
    });

    app.log.info(`Reusable workflow triggered: ${res.status}`);
  }
});
};
