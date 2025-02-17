import { motion, AnimatePresence } from "framer-motion";
import { Typography } from "antd";

const { Text } = Typography;

function TimeBox({label, value}) {

    return (
        <div className="w-24 h-24 bg-red rounded-xl p-4">


            <div style={{ overflow: "hidden", height: "40px", position: "relative", textAlign: "center"}}>
                <AnimatePresence mode="popLayout">
                    <motion.div
                        key={value}
                        initial={{ y: -40, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 40, opacity: 0 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        style={{ position: "absolute", width: "100%" }}
                    >
                        <Text style={{ fontSize: "24px", fontWeight: "bold", fontFamily: "Raleway", textAlign: "center"}}>{value < 10 ? `0${value}`: value}</Text>
                    </motion.div>
                </AnimatePresence>
            </div>
            <p className="text-center text-yellow font-bold">{label}</p>
        </div>
    )
}

export default TimeBox;