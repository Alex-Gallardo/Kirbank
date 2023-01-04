// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Base64.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract KirbankToken is ERC721, ERC721Enumerable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;
    // Libreria de string, para convertir numeros a string
    using Strings for uint256;

    // mapping(uint256 => uint256) public tokenDNA;

    // Cantidad maxima de tokens
    // uint256 public maxSupply;

    constructor() ERC721("KirbankToken", "KBT") {}

    // Funcion para mintear los tokens
    function mint() public {
        uint256 counter = _tokenIdCounter.current();
        _tokenIdCounter.increment();

        // Validacion de limite de tokens
        // require(current < maxSupply, "Limite de Tokens!, no se pueden crear mas token");

        _safeMint(msg.sender, counter);
    }

    //
    function tokenURI(uint256 tokenID)
        public
        view
        override
        returns (string memory)
    {
        // No se puede consultara un token que no existe
        require(
            _exists(tokenID),
            "ERC721 Metadata: No existe el URI de este token"
        );

        string memory jsonURI = Base64.encode(
            abi.encodePacked(
                '{"name":"KirbankToken#',
                tokenID.toString(),
                '","description":"Kirbank NFT propiedad de acciones","image":""}'
            )
        );
        return
            string(abi.encodePacked("data:application/json;base64,", jsonURI));
    }

    // Necesario de override (ERC721Enimerable)
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId,
        uint256 batchSize
    ) internal override(ERC721, ERC721Enumerable) {
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
