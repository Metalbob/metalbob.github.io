var IsFirstMove = true;

function buttonFlee(event)
{
  const mouseX = event.pageX;
  const mouseY = event.pageY;

  const NoButton = document.getElementById("hire-no-container");
  const NoButtonBounds = NoButton.getBoundingClientRect();

  if (IsFirstMove)
  {
    const ButtonContainer = document.getElementById("hire-button-container");

    var PlaceHolder = document.createElement("div");

    PlaceHolder.style = `width: ${NoButtonBounds.width}px; height: ${NoButtonBounds.height}px;`;

    ButtonContainer.appendChild(PlaceHolder);

    IsFirstMove = false;
  }

  const NoButtonCenterX = NoButtonBounds.x + NoButtonBounds.width/2;
  const NoButtonCenterY = NoButtonBounds.y + window.scrollY + NoButtonBounds.height/2;

  const directionX = NoButtonCenterX - mouseX;
  const directionY = NoButtonCenterY - mouseY;

  const NoButtonNewLocationX = NoButtonBounds.x + directionX;
  const NoButtonNewLocationY = NoButtonBounds.y + window.scrollY + directionY;

  NoButton.style.position = "absolute";
  NoButton.style.left = `${NoButtonNewLocationX}px`;
  NoButton.style.top = `${NoButtonNewLocationY}px`;
}
