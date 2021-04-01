import React from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button, useDisclosure,
} from '@chakra-ui/react'
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";

interface GameModalDialogProps {
  dialogType: string;
  gameType: string;
  player1Username: string;
}

export default function GameModalDialog({dialogType, gameType, player1Username}: GameModalDialogProps): JSX.Element {
  const {isOpen, onOpen, onClose} = useDisclosure();

  return (
    // TODO: delete menu item button
    <>
      <MenuItem data-testid='openMenuButton' onClick={() => onOpen()}>
        <Typography variant="body1">Game Modal</Typography>
      </MenuItem>

    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        {dialogType === "unavailable" &&
        <ModalHeader>
          Uh Oh!
        </ModalHeader>
        }
        {dialogType === "joining" &&
        <ModalHeader>
          Ready to Play?
        </ModalHeader>
        }
        <ModalCloseButton />
        {dialogType === "unavailable" &&
        <ModalBody>
          Looks like someone else joined this game before you. This game is no longer open.
        </ModalBody>
        }
        {dialogType === "joining" &&
        <ModalBody>
          Are you sure you want to join a {gameType} game with {player1Username}?
        </ModalBody>
        }
        <ModalFooter>
          {dialogType === "joining" &&
          //  TODO: add onClick to this button that joins Player2 to the game and starts the game
          <Button className="games-padded-button" colorScheme="green">Join Game</Button>
          }
          <Button className="games-padded-button" colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
      </>
  )
}
