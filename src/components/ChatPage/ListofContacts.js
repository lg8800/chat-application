
import React, { useEffect,Component,useState,useContext} from "react";
import axios from "axios";
import classes from "./ListofContacts.module.css";
import ChatListItems from './ChatListItems'
import 'font-awesome/css/font-awesome.min.css';
import AuthContext from '../store/auth-context'
const allChatUsers = [
    // {
    //   image:
    //     "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU",
    //   id: 1,
    //   name: "Tim Hover",
    //   active: false,
    //   isOnline: true,
    // },
    // {
    //   image:
    //     "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANgAAADpCAMAAABx2AnXAAAB0VBMVEX///8zk70REiT4y6JPNCnN2fEAAAC1Jizit4La2tv9z6XMKzFNMiiqiGtFKiH/0afWsIwTExOPAABfPy4AABckjroAABpVOCtPMiVBJR1XOixmRDAxl8JJLiSSAAAQEiNQLRsAjL4AABNyTDRPMCA7HxgAAAjSqnhIKh1zTDRHU11LQ0NQMCDqv5d3s8//zJ3huJLLpIJJPzVQKhTXqYHt8vnY4fOvAACyExyUlJpBQUwnKDZsbHQ/GwhFJRd8a2RbQzjKw8E4gJ/M4eugfmVqTTyQb1mPv9a7lneu0eE0FwCPqrN4ZFEyKyW2lniqsa7M2vfkvL2NjZV7e4JZWWPp5eOMf3tmTkawpqNvW1PAuLWGdm62rKiajYhUosZBZns/cox2WEZSJABCIQBmPRKBXDmsg2DD3OeEqrpURzoWCgAnFABySyJMKwaDbVmTbkpbPB85MytJHQDsyqsxka9gq8fu3s4PPUk6SEgRVm8WIxoAcJMhHxwoNzH57OBcma3JvKmKp7OlYUGxelWTOCC5cnWsV1qjPkDOn6CcIiK6UVLkzc7MlHLMrZfAp3+rssPKYnPMP0fMuM3MoLPKBg3OiZfde3zorK7y1Na4NTs1N0S7i0slAAAXJElEQVR4nO2diX/TxrbH7dgRiZAlZ/EaiyTOQkgikINT8BJIgm0MZAEvbL0NhCU0t4WUptDeWyhc7qO3peW1vS20zV/7zsxotSXbUHl9+fFJbEvjaL46Z86cGY2Ezbavfe1rX/va1772ZbMVi0Xtx96/LTWrJu+j4vXLV6YWFk5d+fCqBqN49bR/Acl/5fTlyx9dPn3NBx+K5n+m1bR0+tSpKb8TxE+dWrgiseGtTizG759C4hnnwtUmV7Z2XV9ckOpP5D916sOibenKgt9ZrlOnm13dWtV7ZYEpq/7UwqLBVgT9YbPrW6OKlw3tAs5nuNXJnL7aFrHjun/KGMBU/lML/tOtzlY8vWBgE1/ZppItzNSC82/NrruxPsK/l5wG5mKCMkZQ3jRgUGphsSWtNoVC9kf68CBzDElVV3CGDBwSXHLhcrMpylV0Llz7yHdK725BgjlQ8soYc4FOXWm5nroIHe4UI7ueVH/p8xCj+8wMEUADd3ROtR7ZosYJB3QgPvLKDEi8wTHG3GxT15oNUqoP1agh1dk3JH0ioYMZc2peZcxyb2y17npJbV8S2IBkuDHZcJI5kQEZn+ynTGm3vdBisfEjTZwnthmSXO+I5IkDjMopmw8cs7Sp+RebjaLTkrZflhqRD5OQJgUoPgKCTRVUAslAqcXGF1qqp75G0sMgsZGWRPJI5xENn9repJbGKKmIf3p540yzaVRdJwZjBlQ/k8CcQwMaM5IXxidbUfbDoQEZbPZGyO4522weRYtSPj+kQZK6K6mpSf5JQsdYkDir3BGMaTL/48tAZm8Ro12QWhhpV1LDIb8ZHRihleKJTw4rY/p2Zge1hNHmN+LyAIxEceJpUoDQuSL2UimAkKYIn47oucZnQohsY77ZXGfsyyNypYgtpN8a51PAjjBKyJDDZQmX0zkyjck8TXbHc57QNDGY4n8MthKjCReqxZiS4MIc8UlgA0MDUgg5fiOE3fFcM7nOeuzL41LFUA3J+df4IiNHQOKY6ludQZkhiJBKFjIikTWxoR312EM3ZuXGAkbDkY7kh0w5GM4zcEOU+jfJa4NHBnS5FfFGu+dos7geeUIh+7hSnyM+5GHYJQkGJlDDPoO2MJrNktMOjZW3MzsJIc3h2vAsz9yYQS2MYXDHi84/bkFkNgAbhURKkitiMEI6pNiRGcMmZFD6odht3HkTzlmTyDbAD2+SeviGhsAPiQFwlUlyRTzSqfD5CJjip6hbg/yDnJSxsaExTe44MnOzSTZ75IEDh0LT4IpDQ8GBMcgfSHX1U1BMkEBiPmw2xZpoG84/GOcYuDCjzfb9s+COTSE7iriWp2dnndiFGBga+0qn1YhImECxnEFe6MOFfBIiseSRoH585p+ZvrGMA0jDI8hZj51I8R0IiT65djzLsjzPkGqSrZjH59Qa1Ce75FjpNLF/OhQKEbAGk52TudS0Q5nGYfl0xpXNpjLpIB/geXmv4WQA3kjCiySyfXzmxvS0TNbAnvqMzBW6Me6UaoWiB7zl+ZRIczSI4xxiJLXJBFheB8OwgUBA3UROBwM9/BhoSBqg+melBASR3WsU17xdVghFewYydBCOaGxa4ByqaM4huF2b7ATAkZ6anVhMRdyRFB/Qul8QUg8cVXxBeWg6cjOkHKZRGfGGckT7DHKlI7h1oYjGZjjaUSJkPDGbSTvBUnwwJRJz0tkgq6BBB6d0YYw01z+7rBykUaFRCRygOb9zLKjUic+UYSmm4wR3xA1eqmxxAJrij2UTVv451WANShvPaLjsM37NPBMTNMGSUUo/p1gFzQeuyGjgbmk8EcgaMYjRHhDamOZET0TMDGaGKqhoPogeR+TpHeecjqshzeyo1mA48VAMluaqs5SIEzI8Kzcu6OUhrcJRZk6P1YDeTOeIkCxq+rFA9h0NJltNjZCYDVlt9kaJxerujJqIaEdpqvaCs/AeXA4cRjZRV86TDoH0Y+MlJrPXOTKe0xgsdAOGTdMKGb/5PgYjaJwAXfnmpqa9Hl8uAatvAjKvO9bN4zPLN2flqrCpd29iWjaOcwdUsJHS6FHf+HFW18LsI/5Z1RVZ13tbTGKLaMDKGlldO7N5PVdoelatiZN9r9hhBjY+XWYxT/1MVmIwu92piR2Bd+3FKoL5Z8rB6hby50u5QtpRC+v+a1xlYDcbZrIyg2n7MYYX/yqYWwe23LBWNl+KBePM5ZvH/2o3pkoPNlMa8O31Coznygxmt9+4KdusSgb8rmCQ3pcfrU592Ub5kSAwTpNB9HtliiUSJzRgBh1ZndKPM6MGYDBwmcFzpk5m8y+DCRqw8fKoCBqtR8ZYHjokMhLy+YwGjFZkwmBcQAM2s2zQxOoT8U245DxYSTxgkByNRLJYEbfgKIODz2KUFIhEooKDk/FobfC4ZQRm91jPdc8MLEQCIxuBbI9ziG73zv3z52/fvn3//v1boDt3oyVcW5/euYV1//7t2+fPf+aKuEXAA2mn6PyGB6vDjNVRM7ALH0NmxfATqdTK9sPVPoqiJpEopL9/cv72/U+hyrJN0NzHrTv3b5//5O9SwTAqOdm3Orf9wLXI4pURaOTiL0+p6uSLJlie9WO0m+oDQfUoqg+hfDZ2d2dnC+QCrcz1TUKdI6iXE8S11Moq9QQ+g6DAzs7dTz+7fXvqk9VJ9HX0Z548+cTJmwRFJKu5zpgYzLNLO7gVXKW+yZXsZ3du7YjIqzg5OICJsteQ9frmHuKXB26HvJcUjHx6686OuLY92Ue05nCzzhGzE2l1XDSLifZjguiQTLbG3f38roidTujpiUZ7egQpnJACqMy2QGYee9QCMIK+83mWo1cwGRURRDozZeyJdUirHpkc59kxt9vteIiqtOrYuhPFMV+I7vaGRkc9z3YlNG5FMge1RrCiz78YHR199FiMErStz0UugugnHzjcbjGysGwCZnkfbeaJFwQAE1Is/2RyhbtL5g57xG9sIc+X+XujZ78RMRmXolBUATA3KtGzawtt3PvqH6NnbY+jpEB0ixb6+iYglXajP7hqgmV5wDdtYusITIwE+BS1InVYUG1IU77855JtOWSziRLY5PaaSwITHtvujV6w5f/5Ney3EXQaOrwnq2k+7cBgZqHD8kZmlACrYG5hIiBQKyT1gGpDrzf65dOnX/0jBOk4qjf3gJrjUFPDYAB+bvTLr54+xWA2eVRAP7mWCWQwmMMoL5WOaG0ibNaLSWB0YJGTwRwIbH7069WnT/HVhF1U5xVMxGVwG/sG7/+ntB8XwGdk8oFrIov/nuOZOZi1PZmZZ8hgAyvckzm5gshmZ0e//tqDctbH2BgPV/GLSKHEa/cbdf83jxWDuSmXeyJSDczinsws2HvWsevQmykIfOpIUxB215998Wzp8a60jdok2z/ZJmFz9/GFL2D/rqB+h16DSM9KYOauaG30KJvtUI5ygcZgGTcH9dKmu8dASp0jVBa/ETN9RvulLoESuKAbB6OKYFZGD9MMWAZLCbQSPcrFrcyRTFiMUOZzWU+2OS7jRh4gOMy5rM2DzYKi3fMxDR2PSEPTobcpsyo7qFRUctFVM3rwxDWazkYImOkYyeKwaJpQ2TeOCQgsRaOamUxyQy8mSmBiinTRBoXm0HkRMJhjd7QCmJVJlemYxW6noSYCtwlBADIHw4kqWpzc5qS5OVGgtg3p6Szq4Gl3lkbn6Xkli1kZ700yRTvO7kUAS4MdoBc28jPaMQdWkpAFsF7GqJDwBLU+2pWFP+c4tl4BzNJssUIicB1MJnADqH+i56gHDk4/FUBz4kMp85U2rOBCujK4EPJjbtNFi6Lj2LPmg9k/RkGbGyBmeED1raxBtOaIaEGMrFCr+kBIp6gnGX0Z1zbVt4b/gI/MnFTishTMNCUFoYyICy5KzekBzuJXH86B8ETB9lrpcgFOcK3qy1BzLoHGXw9gy1+vCBayEKxSf7mOksCBCVF2PSGy5kqlHiCl1iJ0+YoWUsglFUm5sm65EJ2dQGDHKiVUdktzqkoWe4bA0tor6/Kwv8K8okMtoSnEZZDF6N2KBrMUrNJhRp9DQEyzRrHunYXPz7F/NQ6sksU8z4456E2erQAWNf2glxhgs3RVg1kJVqGNAdlzms7wE+aXx6LafpuOml5uorMsG3Ec+7hVwOx2SJrYCtfWt/R7TK9Vw+kJRCtmHVgN6seQyTZ2P5ziTa+2CHoSbsusIM06T72uHOqtBjNPqQiZB13+M3OxUrAdMzB3wHncU5XLUrAKSTDR8nHzVQNCCYkZGO1ineOVwpR0Fq1Mgs2HLbJGzFdh0jsRtauiHTtRk3JcmjFYBFEOZuWwxXSgqWjOySyacNH01s4WTpkgZ9q5G+FMum2RN1iPYwBm5UDTbL5U1bTfGTBa6IGSJ1fEHb0LHRQnbO2I7ix8dhiNXLKsc9Z8olQFs3JqwHQyRxZap86myq5d4nWW6O6CtAustrUTcQ2gjyyTEsrQoJN3jhhexiwBs3RNRFUwCIuMTwETsAc63BlpgT3DsGzG5doMyCu3WTYlOkiWKH9J4Bln2SpFIzAruar10BAWZ52KL9Kp4GJ6c3NzMaC9lQBMp/sYQEXSi8GsnNmzTv9MDWBWjlpqiPf2Rc3CgSCP7oYIBNiKwkUYfoB8iU4zzlmzq2Jag1k7xV01LOJlzwzpo90TfMZVo/zOCfIltHrF9PqsFszaixJVw2IILTUlSxZRLptVLtVWFheQOnYuxZutFCgBs/habdUDLh9nnEyaNDGer3V0JgbkBZyM4RpFA1nLZTta7XghFBHw2YcknUnXtiiTjrBOHvUSKJ2qqXu2W70eonojQ4vFMBCEASZY2xo/OgVgaFggoLuraurFrL64Xj33WEYLdAJZzkFDHVlyhZaTp3LKu268h4NOGS2bg/EcMngNBrP+xoKqPRm6MwkRcWitF57bEV68eJGNIEUVRYiyL178GwEuQsP0ObgIWh42XosnWr+wr2qCT+5hZ4JutJ6SLML/n/7+l/L3i1jyp2/7+/9NQ04M2QbDixHcc5fdQ2BkMOtXz9bgi3itKcOjpV48uoJJ/9h/qP8/l8r/1qXvYYcgL29mgjxZLFudqy63uFQ9aGhGs1idx03pRT8Q9H/73Q+KqYqXvgNrHTrU/yOaqk+x6jdGavFEy5dS2WrxRd2tSeQy2Iv/IAikQ9+DpLfwgluYQ3s3S029cz3WcVcdutjts2o95Umr7HffY6tpBJ9ebuGdgiYrNlnHVwJWl2XcVWZ0lJuHyUBFXvsceXzp2/5DJ06cOASC3/3937+5FJG6Z+1dOjWEjjrda2V6hV2Vxhcn5B4rGikWL718deAE0p+v3vxQfC3NetCaJlZTOlWvW62qHlp7Fw+rTlpFI8+LJN6DJy29jsrdNVfy3Kbqqg9XDVM6y2pc1ObBtCP644+R169fo8XN6oSV5gaC2gxWtxutqh5aczMqo06gCmipNhnHcLSoXJTAI5V3aWH1u8+q+vSiXfVFzRUzIbK1FRUFQYzCq5owqou2awuJdbwzripY6IZ6e1Jak/M6xOwOaCuqpsNokuPdDFY/rhpaGUmFicl0c97oCqb+CmdaCR21zHXU+e7T6oFRc0eZz1FBnEuTTtVgL4tnp0pV3WSakA+ZsOlAmtN0zsdrmMOp+/NKqg/L7Koh2LRoPPdBO1wqV02OWO8bvGvIGEPL6k2APJ8Syq5B0Jwjklb9kDG4A65cdbylVlL1kK+JjGA0ZnPNLcjLcNCEgJjNLLKV7lE35GrAEz023qWZIauxgYmJgKyJiQlWi1XTJGn9HRGp+lBaG/OrqbbhZWOetlhDZ2b310g2Pl0Dln20QU9wqn6FIrRs9l8t6MUf+aIGLs+jxnDVFPPXfDWQsZuHawELNeyBpjU0s/89XJ0MuGoBa+TjTO+NVgc7rOmrjLkyhw/3VAcbbdiDxJCqBhB3z+HDGbaC0XjnFnD1VFwki+3V4Ie0Vu6nPf8Se4Bsy2dmNCYAbghcPT9VifaNf0RrpdDoOfsTgAHZ4R2eN8Jig1uEq+enKmeoCQ9oNSfzbHRjMER2OOMrdUieHZCxAKy74hlqyoNnzWvULYERtK00y/KM9GwmHpJHhCVxAVh3q3GZtjPP2e7ubrniGO3w1s4metZnML25g6mUvQjM1Bmb96Bg4yptAFe3qFSdoOmk7utBZU36+2Y+2tkw6qO6Xnzeo5UJlQRm7IzNfRj3mbKFk9gRQT01aQmXNbJ84x7waaz50uHZBuG6uFQLl0gKlztjCzzwvjQ4XpTqWuKMxuqWC5ecneaFDa3OadzRc7RbUXWybvks6DszT3OblyqNO4ZUru6LvZWxdjVlu7VPLG0BN5QlG81zrlun3QpcS7qSSnxtGXMRzR8dLXFEIlOjPVfdUOeMnketYy6iM8gfS7nMomMZVjfpzDyt9P/sKDoXOlsOBgRLYinWB+VYqDPzhFrKCzUyqC5G69W0NXHJwFpYG62KBS3NuMYas4EPmmB1d7da49LKrM6AdrH3+W6vmbGQPmh25SvJ1GRIP/9caW9LG6ySybp/OXjwlwq7W9pgNtsHZvX+70Gs/7apwUxN9ivhOvjbr+1pMDOT/frbQZnsTXsazNhk85cUsINvDUu0vMEMTWazFVWL/W7I3voGK4/42BiKwX77w2YA3wYGK6s1qfMrhaxoUKYdDFZqMqnKb2SuX4wKtYXB9E1INoUSPd5KG+aNSrW45g1qLEcPFDvKSrWJwVSTaSusjR2SPmgzgyk11hnira6JmZdrbRnY4dLJA6CTb3UbMdnFtjEYqXBJdV9isAMH9Fvn28tgqL6lZnhFuE5UL9nSKrfCnxLYH9WLtpWKkieeNLg3qa31wwkJ7E2za2KxfpcsduBVs2tiseSgeODPZtfEYklBEVSsXridJBvswMmysNjWKp5QwH6vXrqNdEm12MvqpdtI3ylgHRYW3ypcHRYW/1TBTnZSWCwe0IB1Ulj846QGrJPC4iUtWCeFxTcasI4Kiz9ruA6cbHZtLNQrLdiJzgmLxZM6i3XOWPOPEzqw75pdH8v0u95ib6t/o02kC4qdlFTpYseBDhprlnB1TFJVPFEC1ilh8VIpWKdMwem7sQ6ymC4H7iCD2fQd2cmfm10bK/VSnczppOQe9Eoh65hOTJLpZaR2F5kd6Kh5AUmoN+ukgKjq9xOdFjhkvT1QvUx7qtMC4r72ta997Wtf9VNvh8pGdahsXR2qfbB2U0Uwr1f3SfppDxGw4Tj8SgyT93vktWt4sFAIJ/aUonHvcKIg72x5ETBvMukdzA2GB4cHw1SuyxsOe71han396noyRoUpqstLUXu98JOLNxJs2PBgw7r3w9q3w+peyRUTuXAin4/lKfjJx/ZisXw8Nt07TVHJYiHW25uI9/bGl+LwutfVUGlc3ytDeLVk0FqGvXgT/AYNy9+QwMKxrmQyOQg/k5M5b66LSuYLk0CTT8YSS1RhfWmPShR7vd6GOqK3UMh3JbyJrvhgwttVyMf3vInBRFceUBJoS1cinCwkC7lkLlmITcYSsWQy15UveLVg8DdyBdiRj3vDua7Y5GAyF/dOUt7efGx6ndq7vhQOA1iiwbEjkc/l1wu5+Hoyn0Sv4E1Qw6XCZL4Ab3KxXDy/l6RySW8+kY/n47mr+RhA6MC6vFfziZw3kYh1JQpwFrpihYI3lswh9+tNLuVj1/PIFScbCxaGGiTjCKiQj8WTsRwYB2EmYvEcMgSwxvNQ3WQun0iuJ5L5GGyOhfVgSbB5Lo9+wkkqmUsk9ryFWH4wXIh7Y4VwGFwSNscbC9aV6PLGvXuJBPwGhwzDzyR8gqrFw3Ev7I13Qav3DsIe1Lbi4a69wb1Elw4MNdPhQfgFP/BvEG8KD+LWGfai92hzg7mIhiu+NWv1/z8zj3bWPli76f8A1bYvAXYS/kMAAAAASUVORK5CYII=",
    //   id: 2,
    //   name: "Ayub Rossi",
    //   active: false,
    //   isOnline: false,
    // },
    // {
    //   image:
    //     "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTQEZrATmgHOi5ls0YCCQBTkocia_atSw0X-Q&usqp=CAU",
    //   id: 3,
    //   name: "Hamaad Dejesus",
    //   active: false,
    //   isOnline: false,
    // },
    // {
    //   image:
    //     "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRZ6tM7Nj72bWjr_8IQ37Apr2lJup_pxX_uZA&usqp=CAU",
    //   id: 4,
    //   name: "Eleni Hobbs",
    //   active: false,
    //   isOnline: true,
    // },
    // {
    //   image:
    //     "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRJo1MiPQp3IIdp54vvRDXlhbqlhXW9v1v6kw&usqp=CAU",
    //   id: 5,
    //   name: "Elsa Black",
    //   active: false,
    //   isOnline: false,
    // },
    // {
    //   image:
    //     "https://huber.ghostpool.com/wp-content/uploads/avatars/3/596dfc2058143-bpfull.png",
    //   id: 6,
    //   name: "Kayley Mellor",
    //   active: false,
    //   isOnline: true,
    // },
    // {
    //   image:
    //     "data:image/jpeg;base64,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",
    //   id: 7,
    //   name: "Hasan Mcculloch",
    //   active: false,
    //   isOnline: true,
    // },
    // {
    //   image:
    //     "data:image/jpeg;base64,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",
    //   id: 8,
    //   name: "Autumn Mckee",
    //   active: false,
    //   isOnline: false,
    // },
    // {
    //   image:
    //     "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSM6p4C6imkewkCDW-9QrpV-MMAhOC7GnJcIQ&usqp=CAU",
    //   id: 9,
    //   name: "Allen Woodley",
    //   active: false,
    //   isOnline: true,
    // },
    // {
    //   image: "https://pbs.twimg.com/profile_images/770394499/female.png",
    //   id: 10,
    //   name: "Manpreet David",
    //   active: false,
    //   isOnline: true,
    // },
  ];
const ChatList=(props)=> {
  const authCtx = useContext(AuthContext);
  const [allChats,setallChats]=useState(allChatUsers);
  const [searchval,setsearchval]=useState('');
   const loadContacts = () => {
    axios
      .get("https://chat-lg.azurewebsites.net/users/", {
        headers: {
          Authorization: "Bearer" + authCtx.token,
        },
      })
      .then((response) => {
        setallChats(response.data);
        authCtx.setuserhandler(response.data);
      });
  };
  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      loadContacts();

    }
  }, [authCtx.isLoggedIn]);
  const setsearchvalfunc=(e)=>{
      setsearchval(e.target.value);
  }
    return (
      <div className={classes.main__chatlist}>
        <button className={classes.btn}>
          <i className="fa fa-plus"></i>
          <span>New conversation</span>
        </button>
        <div className={classes.chatlist__heading}>
          <h2>Chats</h2>
          <button className={classes.btnnobg}>
            <i className="fa fa-ellipsis-h"></i>
          </button>
        </div>
        <div className={classes.chatList__search}>
          <div className={classes.search_wrap}>
            <input type="text" placeholder="Search Here" onChange={setsearchvalfunc} required />
            <button className={classes.searchbtn}>
              <i className="fa fa-search"></i>
            </button>
          </div>
        </div>
        <div className={classes.chatlist__items}>
          {allChats.filter((val)=>{
            if(searchval===""){
              return val
            } else if(val.name.toLowerCase().includes(searchval.toLowerCase())){
              return val
            }
          }).map((item, index) => {
            return (
              <ChatListItems
                setpersonfunc={props.setpersonfunc}
                
                setindexfunc={props.setindexfunc}
                name={item.firstName}
                userName={item.username}
                key={item.id}
                index={index}
                animationDelay={index + 1}
                active={item.active ? "active" : ""}
                isOnline={item.isOnline ? "active" : ""}
                image={item.image}
              />
            );
          })}
        </div>
      </div>
    );
  }
  export default ChatList;